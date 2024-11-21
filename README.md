# Star Wars Explorer

## Project Overview

Star Wars Explorer is a comprehensive web application that allows users to explore and interact with various Star Wars entities using the Star Wars API (SWAPI). The application provides a seamless, responsive, and feature-rich experience for discovering characters, planets, and starships.

## Key Features

- 🔍 Advanced Search Functionality
- 🌟 Detailed Entity Information
- ❤️ Favorites Management
- 📱 Fully Responsive Design
- 🚀 Infinite Scrolling
- 💾 Local Caching
- 🔄 Global State Management

## Technical Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Query
- Axios

## Approach and Architecture

### State Management
- Used Zustand for global state management
- Implemented separate stores for:
  - Search functionality
  - Favorites management
- Persistent storage with localStorage for favorites

### API Handling
- Custom API utility with built-in caching mechanism
- Implemented efficient data fetching strategies
- Minimized unnecessary API calls
- Integrated caching to improve performance

### Performance Optimization
- Implemented infinite scrolling with Intersection Observer
- Client-side rendering for dynamic content
- Efficient state updates
- Lazy loading of entity details

## Challenges and Solutions

1. **API Rate Limiting**
   - Implemented a custom caching mechanism
   - Used localStorage and in-memory caching
   - Reduced unnecessary API calls

2. **Dynamic Entity Rendering**
   - Created a flexible `EntityDetailModal`
   - Used TypeScript generics and type guards
   - Dynamically rendered different details based on entity type

3. **State Management**
   - Zustand provided a lightweight alternative to Redux
   - Simplified global state management
   - Easy integration with React hooks

## Prerequisites

- Node.js (v18+)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/star-wars-explorer.git
cd star-wars-explorer
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Improvements

- Add image support for entities
- Implement server-side rendering for initial load
- Add more advanced filtering options
- Create user authentication for persistent favorites
- Implement more comprehensive error handling