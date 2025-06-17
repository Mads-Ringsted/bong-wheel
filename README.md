# 🎡 Prize Wheel - Friend Song Selector

A fun, mobile-first web app that randomly picks a friend and plays their assigned song! Built with React + TypeScript for a personal, casual experience with friends.

## ✨ Features

- **Friend Selection**: Checkboxes to include/exclude friends from the wheel
- **SVG Spinning Wheel**: Beautiful, responsive wheel with equal slices for each selected friend
- **Spotify Integration**: Each friend has their own Spotify song that opens when selected
- **Confetti Animation**: Celebration effects when the wheel stops spinning
- **Mobile-First Design**: Optimized for phones with big buttons and bold text
- **Responsive Layout**: Works great on both mobile and desktop

## 🎨 Design

- **Font**: Inter
- **Primary Color**: `#FFC107` (gold/amber - festive)
- **Accent Color**: `#4CAF50` (green - energetic)
- **Backgrounds**: Clean white and soft light gray
- **Mobile-first approach** with touch-friendly interface

## 🛠 Tech Stack

- **React** + **TypeScript** for robust component development
- **Vite** for fast build tooling and development
- **Custom CSS** (no external styling libraries)
- **Canvas Confetti** for celebration animations
- **Spotify Deep Links** for music integration

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
  ├── components/          # React components
  │   ├── SpinWheel.tsx   # Main spinning wheel with SVG
  │   ├── FriendsPanel.tsx # Friend selection interface
  │   ├── ResultDisplay.tsx # Winner announcement
  │   └── AudioPlayer.tsx  # Spotify integration handler
  ├── data.ts             # Default friends data with Spotify URIs
  ├── types.ts            # TypeScript interfaces
  └── App.tsx             # Main application component
```

## 🎵 Adding Songs

Update the `songFile` properties in `src/data.ts` with Spotify track URIs (format: `spotify:track:TRACK_ID`). You can get these from Spotify by:

1. Right-clicking on a song in Spotify
2. Selecting "Share" → "Copy Spotify URI"
3. Adding the song title and artist information

Example:
```typescript
{
  id: '1',
  name: 'Alex',
  songFile: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
  songTitle: 'Never Gonna Give You Up',
  artist: 'Rick Astley',
  isSelected: true,
  color: '#FF6B6B',
}
```

## 🎯 Usage

1. **Select Friends**: Check the boxes next to friends you want to include
2. **Spin the Wheel**: Hit the big "SPIN!" button in the center
3. **Enjoy**: Watch the confetti and their song will open in Spotify!

Built with ❤️ for fun times with friends!

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
