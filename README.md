# FocusApp

React Native (Expo) focus timer with distraction tracking and analytics. Built to satisfy the Sakarya University BSM 447 semester project requirements (timer, AppState pause, reporting with charts).

## Features
- 25-minute default Pomodoro with adjustable presets and custom durations.
- Tracks distractions whenever the app goes to background during a running session and auto-pauses.
- Session summary with category, elapsed time, and distraction count; save or discard.
- Reports screen with Today/Total stats, pie chart by category, weekly bar chart, and recent history.
- Local persistence via AsyncStorage; optional data clear.

## Quick start
1) Install dependencies  
`npm install`

2) Start Expo  
`npm run start`  
Use the Expo Go app or emulator to run.

## Project structure
- `App.js` bootstraps navigation and notifications.
- `src/navigation/AppNavigator.js` sets up the bottom tab navigator.
- `src/screens/HomeScreen.js` timer UI; logic lives in `src/hooks/useHomeLogic.js`.
- `src/screens/ReportsScreen.js` analytics UI; logic in `src/hooks/useReportsLogic.js`.
- `src/services/` AsyncStorage helpers and notification utilities.
- `src/styles/` shared color palette and screen styles.

## Notes
- Notifications are silent visually but play the default sound when a session completes (Expo Notifications).
- To clear stored sessions, tap the trash icon on the Reports screen.

