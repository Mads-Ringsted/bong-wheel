import { useEffect } from 'react';

interface AudioPlayerProps {
  currentSong: string | null;
  onPlayStart: () => void;
  onPlayEnd: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentSong, onPlayStart, onPlayEnd }) => {
  useEffect(() => {
    if (currentSong) {
      onPlayStart();
      
      const openSpotify = () => {
        try {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          
          if (isMobile) {
            // Extract track ID from Spotify URL more reliably
            const trackMatch = currentSong.match(/track\/([a-zA-Z0-9]+)/);
            
            if (trackMatch) {
              const trackId = trackMatch[1];
              
              if (isIOS) {
                // iOS - use proper Spotify URI format
                const spotifyURI = `spotify:track:${trackId}`;
                
                // Try app first
                window.location.href = spotifyURI;
                
                // Fallback to web after delay
                setTimeout(() => {
                  window.open(currentSong, '_blank');
                }, 2000);
              } else {
                // Android - try multiple approaches
                const spotifyURI = `spotify:track:${trackId}`;
                const intentURL = `intent://track/${trackId}#Intent;package=com.spotify.music;scheme=spotify;end`;
                
                // Try intent first
                try {
                  window.location.href = intentURL;
                } catch {
                  // Try direct URI
                  try {
                    window.location.href = spotifyURI;
                  } catch {
                    // Fallback to web
                    window.open(currentSong, '_blank');
                  }
                }
              }
            } else {
              // If we can't parse the track ID, just open web version
              window.open(currentSong, '_blank');
            }
          } else {
            // Desktop - open in new tab
            window.open(currentSong, '_blank');
          }
        } catch (error) {
          console.error('Error opening Spotify:', error);
          // Final fallback - always try web version
          try {
            window.open(currentSong, '_blank');
          } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
          }
        }
      };

      // Small delay to ensure this happens after the wheel has stopped
      setTimeout(openSpotify, 500);
      
      // Mark as play ended
      setTimeout(() => {
        onPlayEnd();
      }, 2000);
    }
  }, [currentSong, onPlayStart, onPlayEnd]);

  // This component doesn't render anything visible
  return null;
};

export default AudioPlayer;
