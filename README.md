# 🌿 Meditasi App (Mental Health & Wellness)

<div align="center">
  <img src="./assets/icon.png" alt="App Icon" width="100"/>
  <br/>
  <b>Find your inner peace, sleep better, and wake up refreshed.</b>
</div>

<br/>

## 📖 About The Project

Meditasi App is a comprehensive mobile application designed to help users manage stress, improve sleep, and practice mindfulness through guided meditations, soothing music, and sleep stories. Built with **React Native** and **Expo**, it offers a smooth and calming user experience.

---

## ✨ Key Features

### 🧘‍♂️ Mindfulness & Meditation
- **Guided Sessions**: Curated meditation courses for anxiety, focus, and relaxation.
- **Timer & Player**: Integrated audio player with calming visuals.

### 🌙 Sleep & Relaxation
- **Sleep Stories**: Bedtime stories to help you drift off.
- **Soothing Sounds**: Rain, forest, and white noise integration.

### 🎵 Focus & Music
- **Ambient Music**: curated playlists for studying or working.
- **Background Playback**: Keep listening even when the screen is off (via Expo AV).

### 💬 Community & Chat
- **Chat Support**: Connect with wellness coaches or community members.
- **Real-time Messaging**: Powered by Firebase.

### 🔐 Secure & Personal
- **Authentication**: Secure Login/Sign Up via **Firebase Auth**.
- **Profile Management**: Track your journey and manage settings.
- **Onboarding**: Smooth introduction to app features.

---

## 🛠️ Tech Stack

This project is built using modern mobile development tools:

- **Framework**: [React Native](https://reactnative.dev/) (via [Expo SDK 52](https://expo.dev/))
- **Navigation**: [React Navigation v7](https://reactnavigation.org/) (Stack, Bottom Tabs, Top Tabs)
- **Backend / Auth**: [Firebase](https://firebase.google.com/)
- **State Management**: React Hooks & Context
- **UI & Animations**: 
  - [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
  - [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
  - [Expo Vector Icons](https://icons.expo.fyi/)
- **Storage**: Async Storage

---

## 📂 Code Structure & Explanation

Here is an overview of the project's folder structure and key components to help you understand the codebase.

### Project Layout

```
src/
├── components/      # Reusable UI components (buttons, cards, inputs)
├── compliance/      # (Optional) Legal or compliance text
├── constants/       # App constants (Colors, Fonts, Layouts)
├── context/         # Global state management (AuthContext, ThemeContext)
├── data/            # Static JSON data (e.g., initial meditation list)
├── hooks/           # Custom React Hooks
├── navigation/      # Navigation configurations (Stack, Tab)
├── screens/         # Main application screens (Home, Profile, etc.)
├── services/        # External services (Firebase, API, Gemini AI)
├── types/           # TypeScript definitions
└── utils/           # Helper functions (time formatting, password metrics)
```

### 🗝️ Key Components

#### 1. Entry Point (`App.tsx`)
The root of the application. It sets up:
- **Providers**: `AuthProvider` (User Session), `ThemeProvider` (Dark/Light Mode), `SafeAreaProvider`.
- **RootNavigator**: Switches between `AuthNavigator` (Login/Signup) and `AppNavigator` (Main App) based on user login state.

#### 2. Navigation (`src/navigation/`)
- **`AppNavigator.tsx`**: The main interface after login. It uses `createMaterialTopTabNavigator` positioned at the bottom to allow swipe gestures between main tabs (Home, Sleep, Meditate, Music).
  - *Custom Tab Bar*: Implemented using `react-native-reanimated` for smooth scale and opacity animations when switching tabs.
- **`AuthNavigator.tsx`**: Standard Stack Navigator for the authentication flow (Onboarding -> Login -> Register).

#### 3. State Management (`src/context/`)
- **`AuthContext.tsx`**: Manages Firebase authentication state (`user`, `isLoading`, `login`, `register`, `logout`).
- **`ThemeContext.tsx`**: Handles app-wide theming (Light/Dark mode) and persists preference.

#### 4. Features & Screens (`src/screens/`)
- **Interactive Player**: Found in `src/screens/detail/PlayerScreen.tsx`. Uses `expo-av` for audio playback with play/pause, seek, and background audio support.
- **AI Integration**: `src/services/gemini.ts` connects to Google's Gemini AI for generating content or personalized recommendations (if implemented).
- **Backend Services**: 
  - `firebase.ts`: Initializes Firebase Auth and Firestore.
  - `api.ts`: Centralizes other API calls.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   Expo Go app on your physical device (Android/iOS) or an Emulator.

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/yourusername/meditasi-app.git
    cd meditasi-app
    ```

2.  **Install dependencies**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```sh
    npx expo start
    ```

4.  **Run on device**
    *   Scan the QR code with the **Expo Go** app (Android) or Camera (iOS).
    *   Press `a` for Android Emulator or `i` for iOS Simulator.

---

## 📱 Screenshots

<div align="center" style="display: flex; justify-content: center; gap: 10px;">
  <!-- Replace with actual screenshots -->
  <img src="https://via.placeholder.com/200x400?text=Home" alt="Home Screen" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Player" alt="Player Screen" width="200"/>
  <img src="https://via.placeholder.com/200x400?text=Profile" alt="Profile Screen" width="200"/>
</div>

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by the Meditasi App Team</p>
</div>
