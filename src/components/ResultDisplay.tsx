import type { Friend } from '../types';

interface ResultDisplayProps {
  winner: Friend | null;
  isPlaying: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ winner, isPlaying }) => {
  if (!winner) return null;

  const handleSpotifyClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isMobile) {
      if (isIOS) {
        // iOS - try to open Spotify app first
        const spotifyAppURL = winner.songFile.replace('https://open.spotify.com/', 'spotify:');
        window.location.href = spotifyAppURL;
        
        // Fallback to web after delay
        setTimeout(() => {
          window.open(winner.songFile, '_blank');
        }, 1500);
      } else {
        // Android - use intent URL
        const spotifyAppURL = winner.songFile.replace('https://open.spotify.com/', 'spotify:');
        const intentURL = `intent:${spotifyAppURL.replace('spotify:', '')}#Intent;package=com.spotify.music;scheme=spotify;launchFlags=0x10000000;end`;
        
        try {
          window.location.href = intentURL;
        } catch {
          window.open(winner.songFile, '_blank');
        }
      }
    } else {
      // Desktop
      window.open(winner.songFile, '_blank');
    }
  };

  return (
    <div className="result-display">
      <div className="result-winner">
        🎉 {winner.name} skal have en bong!
      </div>
      <div className="result-song-details">
        <strong>{winner.songTitle}</strong> af {winner.artist}
      </div>
      {!isPlaying && (
        <button 
          className="spotify-btn"
          onClick={handleSpotifyClick}
        >
          🎵 Åbn i Spotify
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;
