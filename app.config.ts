module.exports = {
	expo: {
		name: 'Dance-Tracker-Prototype',
		slug: 'Dance-Tracker-Prototype',

		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/images/icon.png',
		scheme: 'myapp',
		userInterfaceStyle: 'dark',
		newArchEnabled: true,
		splash: {
			image: './assets/images/splash-icon.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
		},
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/images/favicon.png',
		},
		plugins: ['expo-router', 'expo-sqlite'],
		experiments: {
			typedRoutes: true,
		},
		backgroundColor: '#000000',
	},
};
