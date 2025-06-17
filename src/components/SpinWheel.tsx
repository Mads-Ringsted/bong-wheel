import type { Friend, WheelSegment } from '../types';

interface SpinWheelProps {
  friends: Friend[];
  isSpinning: boolean;
  isStopped: boolean;
  finalRotation: number;
  onSpin: () => void;
  onSpinAgain: () => void;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ 
  friends, 
  isSpinning, 
  isStopped, 
  finalRotation, 
  onSpin, 
  onSpinAgain 
}) => {
  const selectedFriends = friends.filter(friend => friend.isSelected);
  
  if (selectedFriends.length === 0) {
    return (
      <div className="no-friends-message">
        <h3>🎯 Vælg nogle venner for at spinde hjulet!</h3>
        <p>Tryk på knappen ovenfor for at vælge venner.</p>
      </div>
    );
  }

  const segments: WheelSegment[] = selectedFriends.map((friend, index) => {
    const segmentAngle = 360 / selectedFriends.length;
    const startAngle = index * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    
    return {
      friend,
      startAngle,
      endAngle,
      color: friend.color,
    };
  });

  const generateWheelPath = (segment: WheelSegment, radius: number): string => {
    const centerX = 200;
    const centerY = 200;
    const { startAngle, endAngle } = segment;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
  };

  const getTextPosition = (segment: WheelSegment, radius: number) => {
    const centerX = 200;
    const centerY = 200;
    const { startAngle, endAngle } = segment;
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;
    const textRadius = radius * 0.7;
    
    const x = centerX + textRadius * Math.cos(midAngleRad);
    const y = centerY + textRadius * Math.sin(midAngleRad);
    
    return { x, y, angle: midAngle };
  };

  const wheelRadius = 180;

  return (
    <div className="wheel-container">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className={`wheel-svg ${
          isSpinning ? 'wheel-spinning' : 
          isStopped ? 'wheel-stopped' : 
          'wheel-idle'
        }`}
        style={
          isSpinning 
            ? { '--final-rotation': `${finalRotation}deg` } as React.CSSProperties 
            : isStopped 
            ? { transform: `rotate(${finalRotation}deg)` }
            : {}
        }
        onClick={isSpinning || isStopped ? undefined : onSpin}
      >
        {/* Wheel segments */}
        {segments.map((segment) => {
          const path = generateWheelPath(segment, wheelRadius);
          const textPos = getTextPosition(segment, wheelRadius);
          
          return (
            <g key={segment.friend.id}>
              {/* Segment background */}
              <path
                d={path}
                fill={segment.color}
                stroke="#ffffff"
                strokeWidth="3"
                opacity="0.9"
              />
              
              {/* Friend name */}
              <text
                x={textPos.x}
                y={textPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="14"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                transform={`rotate(${textPos.angle > 90 && textPos.angle < 270 ? textPos.angle + 180 : textPos.angle}, ${textPos.x}, ${textPos.y})`}
              >
                {segment.friend.name}
              </text>
            </g>
          );
        })}
        
        {/* Outer border */}
        <circle
          cx="200"
          cy="200"
          r={wheelRadius}
          fill="none"
          stroke="#333"
          strokeWidth="4"
        />
      </svg>
      
      {/* Click to spin text in center - outside SVG so it doesn't rotate */}
      {!isSpinning && !isStopped && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            color: '#000',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '2px solid #333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            pointerEvents: 'none',
            textAlign: 'center',
            zIndex: 5,
          }}
        >
          Klik for at spinde!
        </div>
      )}
      
      {/* Spin Again button when stopped */}
      {isStopped && (
        <button
          onClick={onSpinAgain}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            color: '#000',
            backgroundColor: '#FFC107',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '2px solid #333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer',
            textAlign: 'center',
            zIndex: 5,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          Spin igen!
        </button>
      )}
      
      {/* Pointer/Arrow */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '30px solid #FFC107',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default SpinWheel;
