import { useEffect } from 'react';

interface AudioPlayerProps {
  currentSong: string | null;
  onPlayStart: () => void;
  onPlayEnd: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentSong, onPlayStart, onPlayEnd }) => {
  useEffect(() => {
    if (currentSong) {
      // Convert Spotify URI to Spotify app deep link
      const spotifyUrl = currentSong.replace('spotify:', 'spotify:');
      
      // Try to open in Spotify app first, fallback to web player
      const openSpotify = () => {
        try {
          // If it's already a web URL, open it directly in new tab
          if (currentSong.startsWith('https://open.spotify.com/')) {
            window.open(currentSong, '_blank');
            onPlayStart();
            setTimeout(() => {
              onPlayEnd();
            }, 3000);
            return;
          }

          // For Spotify URI format, try to open in app first
          const link = document.createElement('a');
          link.href = spotifyUrl;
          link.target = '_blank';
          link.click();
          
          onPlayStart();
          
          // Simulate "song ended" after 3 seconds for demo purposes
          // In real app, you might want to handle this differently
          setTimeout(() => {
            onPlayEnd();
          }, 3000);
        } catch (error) {
          console.warn('Failed to open Spotify app, trying web fallback:', error);
          
          // Fallback to Spotify web player in new tab
          const trackId = currentSong.includes('track/') 
            ? currentSong.split('track/')[1].split('?')[0]
            : currentSong.split(':')[2];
          const webUrl = `https://open.spotify.com/track/${trackId}`;
          window.open(webUrl, '_blank');
          
          onPlayStart();
          setTimeout(() => {
            onPlayEnd();
          }, 3000);
        }
      };

      // Small delay to ensure the winner is displayed first
      setTimeout(openSpotify, 1000);
    }
  }, [currentSong, onPlayStart, onPlayEnd]);

  // This component doesn't render anything visible
  return null;
};

export default AudioPlayer;
