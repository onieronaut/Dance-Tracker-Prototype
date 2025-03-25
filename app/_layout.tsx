import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { TamaguiProvider } from 'tamagui';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tamaguiConfig from '@/tamagui.config';
import 'react-native-get-random-values';
import { createTables, dropTables } from '@/db/database';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const queryClient = new QueryClient();
	const colorScheme = 'dark';
	// const colorScheme = useColorScheme();

	useEffect(() => {
		const prepare = async () => {
			try {
				// await dropTables();
				await createTables();
			} catch (err) {
				console.warn(err);
			}
		};
		prepare();
	}, []);

	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<QueryClientProvider client={queryClient}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Drawer>
							<Drawer.Screen
								name='index'
								options={{
									drawerLabel: 'Dashboard',
									title: 'Dashboard',
								}}
							/>
							<Drawer.Screen
								name='create-user'
								options={{
									drawerLabel: 'Create User',
									title: 'Create User',
								}}
							/>
							<Drawer.Screen
								name='create-room'
								options={{
									drawerLabel: 'Create Room',
								}}
							/>
							<Drawer.Screen
								name='rotation'
								options={{
									drawerLabel: 'Rotation',
								}}
							/>
							<Drawer.Screen
								name='rooms'
								options={{
									drawerLabel: 'Rooms',
									headerTitle: 'VIP Rooms',
								}}
							/>

							{/* <Stack screenOptions={{ contentStyle: { backgroundColor: 'red' } }}>
							<Stack.Screen name='index2' options={{ headerShown: false }} />
							<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
						</Stack> */}
						</Drawer>
					</GestureHandlerRootView>
				</QueryClientProvider>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
