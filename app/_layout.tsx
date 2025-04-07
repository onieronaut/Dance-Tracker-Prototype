import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import tamaguiConfig from '@/tamagui.config';
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	split,
} from '@apollo/client';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { TamaguiProvider } from 'tamagui';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

const httpLink = new HttpLink({
	uri: 'https://guiding-foxhound-54.hasura.app/v1/graphql',
	headers: {
		'x-hasura-admin-secret':
			'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
	},
});

const wsLink = new GraphQLWsLink(
	createClient({
		url: 'wss://guiding-foxhound-54.hasura.app/v1/graphql',
		connectionParams: {
			headers: {
				'x-hasura-admin-secret':
					'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
			},
		},
	})
);

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

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
	const colorScheme = 'dark';
	// const colorScheme = useColorScheme();

	useEffect(() => {
		const prepare = async () => {
			try {
				// await dropTables();
				// await createTables();
			} catch (err) {
				console.warn(err);
			}
		};
		prepare();
	}, []);

	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<ApolloProvider client={client}>
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
									headerTitle: 'DJ Rotation',
								}}
							/>
							<Drawer.Screen
								name='rooms'
								options={{
									drawerLabel: 'Rooms',
									headerTitle: 'VIP Rooms',
								}}
							/>
							<Drawer.Screen
								name='assign-user'
								options={{
									drawerLabel: 'Assign',
									headerTitle: 'Assign',
								}}
							/>

							{/* <Stack screenOptions={{ contentStyle: { backgroundColor: 'red' } }}>
							<Stack.Screen name='index2' options={{ headerShown: false }} />
							<Stack.Screen name='modal' options={{ presentation: 'modal' }} />
						</Stack> */}
						</Drawer>
					</GestureHandlerRootView>
				</ApolloProvider>
			</ThemeProvider>
		</TamaguiProvider>
	);
}
