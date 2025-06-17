import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import './App.css';
import type { Friend } from './types';
import { defaultFriends } from './data';
import FriendsPanel from './components/FriendsPanel';
import SpinWheel from './components/SpinWheel';
import ResultDisplay from './components/ResultDisplay';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [friends, setFriends] = useState<Friend[]>(defaultFriends);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);
  const [winner, setWinner] = useState<Friend | null>(null);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFriendToggle = useCallback((friendId: string) => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === friendId
          ? { ...friend, isSelected: !friend.isSelected }
          : friend
      )
    );
    // Reset wheel state when friends change
    setIsStopped(false);
    setWinner(null);
    setCurrentSong(null);
    setIsPlaying(false);
  }, []);

  const handleSelectAll = useCallback(() => {
    setFriends(prevFriends =>
      prevFriends.map(friend => ({ ...friend, isSelected: true }))
    );
    // Reset wheel state when friends change
    setIsStopped(false);
    setWinner(null);
    setCurrentSong(null);
    setIsPlaying(false);
  }, []);

  const handleSelectNone = useCallback(() => {
    setFriends(prevFriends =>
      prevFriends.map(friend => ({ ...friend, isSelected: false }))
    );
    // Reset wheel state when friends change
    setIsStopped(false);
    setWinner(null);
    setCurrentSong(null);
    setIsPlaying(false);
  }, []);

  const triggerConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFC107', '#4CAF50', '#FF6B6B', '#4ECDC4', '#45B7D1'],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const handleSpin = useCallback(() => {
    const selectedFriends = friends.filter(friend => friend.isSelected);
    
    if (selectedFriends.length === 0) return;

    setIsSpinning(true);
    setIsStopped(false);
    setWinner(null);
    setCurrentSong(null);
    setIsPlaying(false);

    // Generate random spin amount (5-8 full rotations plus random angle)
    const randomSpins = 5 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = randomSpins * 360 + randomAngle;
    
    setFinalRotation(totalRotation);

    // Calculate which friend wins based on final position
    setTimeout(() => {
      const segmentAngle = 360 / selectedFriends.length;
      
      // Simple approach: 
      // 1. The wheel rotated by totalRotation degrees
      // 2. The pointer is at the top (270° in standard math coordinates)
      // 3. Find which segment is at that position after rotation
      
      const normalizedRotation = totalRotation % 360;
      
      // The pointer is at 270° (top) in the coordinate system where segments start
      // After rotation, we need to "un-rotate" to see which original segment is there
      const segmentPosition = (270 - normalizedRotation + 360) % 360;
      
      // Find which segment this corresponds to
      let winningIndex = Math.floor(segmentPosition / segmentAngle);
      
      // Ensure the index is within bounds
      winningIndex = Math.max(0, Math.min(winningIndex, selectedFriends.length - 1));
      
      const selectedWinner = selectedFriends[winningIndex];

      console.log('🎯 Winner calculation:', {
        totalRotation: totalRotation.toFixed(1),
        normalizedRotation: normalizedRotation.toFixed(1),
        segmentAngle: segmentAngle.toFixed(1),
        segmentPosition: segmentPosition.toFixed(1),
        winningIndex,
        selectedWinner: selectedWinner.name,
        allFriends: selectedFriends.map((f, i) => `${i}: ${f.name}`),
        segmentRanges: selectedFriends.map((f, i) => 
          `${f.name}: ${(i * segmentAngle).toFixed(1)}° - ${((i + 1) * segmentAngle).toFixed(1)}°`
        )
      });

      setIsSpinning(false);
      setIsStopped(true);
      setWinner(selectedWinner);
      setCurrentSong(selectedWinner.songFile);
      
      // Trigger confetti
      triggerConfetti();
    }, 4000); // 4 second spin duration to match CSS
  }, [friends, triggerConfetti]);

  const handleSpinAgain = useCallback(() => {
    setIsStopped(false);
    setWinner(null);
    setCurrentSong(null);
    setIsPlaying(false);
    setFinalRotation(0);
  }, []);

  const handlePlayStart = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePlayEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎡 Prize Wheel</h1>
        <p className="app-subtitle">Spin to pick a friend and play their song!</p>
      </header>

      <main className="main-content">
        <FriendsPanel
          friends={friends}
          onFriendToggle={handleFriendToggle}
          onSelectAll={handleSelectAll}
          onSelectNone={handleSelectNone}
        />

        <div className="wheel-section">
          <SpinWheel
            friends={friends}
            isSpinning={isSpinning}
            isStopped={isStopped}
            finalRotation={finalRotation}
            onSpin={handleSpin}
            onSpinAgain={handleSpinAgain}
          />
          
          <ResultDisplay winner={winner} isPlaying={isPlaying} />
        </div>
      </main>

      <AudioPlayer
        currentSong={currentSong}
        onPlayStart={handlePlayStart}
        onPlayEnd={handlePlayEnd}
      />
    </div>
  );
}

export default App
