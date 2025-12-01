# Anarres FM

> Music with no boundaries. Against every kind of oppression.

A modern web radio frontend built with Vue 3, Vite, TailwindCSS, and Pinia.

## 🚀 Features

- **Live Radio Streaming** - Play/pause with browser media controls
- **Now Playing** - Real-time track info with album art
- **Schedule** - Weekly broadcast schedule with current show indicator
- **Blog** - CMS-powered blog via Sanity
- **PWA Support** - Installable on mobile devices

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | UI Framework (Composition API) |
| Vite | Build tool & dev server |
| TailwindCSS | Styling |
| Pinia | State management |
| Vue Router 4 | Routing |
| TypeScript | Type safety |
| Sanity | Headless CMS for blog |

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # Vue components
│   ├── AudioVisualizer.vue
│   ├── Navbar.vue
│   ├── PlayButton.vue
│   ├── RadioPlayer.vue
│   ├── Schedule.vue
│   ├── SkeletonLoader.vue
│   └── VolumeControl.vue
├── data/            # Static data
│   └── schedule.ts
├── lib/             # External integrations
│   └── sanity.ts
├── router/          # Vue Router config
├── stores/          # Pinia stores
│   ├── nowPlaying.ts
│   └── player.ts
├── styles/          # Global CSS
│   └── main.css
├── views/           # Page components
│   ├── About.vue
│   ├── Blog.vue
│   └── Home.vue
├── App.vue          # Root component
└── main.ts          # Entry point
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: '#262626',
  secondary: '#bf0a26',
  accent: { blue: '#1c366c' }
}
```

### Schedule Data

Edit `src/data/schedule.ts` to update broadcast times and shows.

## 📄 License

MIT
