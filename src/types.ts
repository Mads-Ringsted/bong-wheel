export interface Friend {
  id: string;
  name: string;
  songFile: string; // Now contains Spotify URI
  songTitle: string;
  artist: string;
  isSelected: boolean;
  color: string;
}

export interface WheelSegment {
  friend: Friend;
  startAngle: number;
  endAngle: number;
  color: string;
}
