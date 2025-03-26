# Vehicle Adda - Vehicle Management System

Vehicle Adda is a modern, responsive web application for comprehensive vehicle fleet management.

## Features

- **Vehicle Tracking:** Real-time monitoring and management of your entire vehicle fleet
- **Responsive Design:** Mobile-first approach with custom breakpoints and fluid typography
- **Dark/Light Theme:** Smooth theme toggle with context-based preferences
- **Custom Components:** Reusable UI components built with Tailwind CSS
- **Mobile Gestures:** Touch gestures and mobile-specific interactions
- **Adaptive Layouts:** Responsive layouts that adapt to different screen sizes and device capabilities

## Tech Stack

- **React 18:** UI library for building the interface
- **TypeScript:** Static typing for safer, more maintainable code
- **Vite:** Fast, modern frontend build tool
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development
- **React Router:** For navigation and routing
- **Framer Motion:** Animation library for smooth UI transitions
- **React Intersection Observer:** For scroll-based animations
- **React Responsive:** Media query API for responsive design
- **React Icons:** Popular icon sets as React components

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/vehicle-adda.git
   cd vehicle-adda
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open http://localhost:5173 to view the application

## Project Structure

```
src/
├── animations/     # Custom animation definitions
├── assets/         # Static assets
│   ├── images/
│   └── icons/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layout components
├── pages/          # Page components for routes
├── services/       # API services and data fetching
├── styles/         # Global styles and theme variables
└── utils/          # Helper functions and utilities
```

## Responsive Design System

The project implements a comprehensive responsive design system:

- **Breakpoints:** Custom breakpoints for all device sizes from mobile to large desktop
- **Fluid Typography:** Typography that scales proportionally across screen sizes
- **Container Queries:** Component-level responsiveness beyond viewport size
- **Dark Mode:** Color scheme that adjusts based on user preference and time of day
- **Device Detection:** Adaptive features based on device capabilities
- **Touch Optimization:** Gesture support for touch-enabled devices

## Browser Support

Vehicle Adda supports all modern browsers including:

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## License

[MIT License](LICENSE)

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/) 