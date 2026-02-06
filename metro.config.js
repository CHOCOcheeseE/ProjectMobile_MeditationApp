const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure cjs is prioritized or included for Firebase compatibility
config.resolver.sourceExts.push('cjs');
config.resolver.sourceExts.push('mjs');

// Force resolution to singletons to avoid "auth not registered" due to duplicate instances
config.resolver.extraNodeModules = {
    '@firebase/app': path.resolve(__dirname, 'node_modules/@firebase/app'),
    '@firebase/auth': path.resolve(__dirname, 'node_modules/@firebase/auth'),
    '@firebase/component': path.resolve(__dirname, 'node_modules/@firebase/component'),
    'firebase': path.resolve(__dirname, 'node_modules/firebase'),
};

module.exports = config;
