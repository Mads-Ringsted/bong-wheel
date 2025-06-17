import type { Friend } from '../types';

interface ResultDisplayProps {
  winner: Friend | null;
  isPlaying: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ winner, isPlaying }) => {
  if (!winner) return null;

  return (
    <div className="result-display">
      <div className="result-winner">
        🎉 {winner.name} wins!
      </div>
      <div className="result-song">
        {isPlaying ? '🎵 Opening in Spotify...' : '🎵 Ready to open in Spotify'}
      </div>
      <div className="result-song-details">
        <strong>{winner.songTitle}</strong> by {winner.artist}
      </div>
    </div>
  );
};

export default ResultDisplay;
