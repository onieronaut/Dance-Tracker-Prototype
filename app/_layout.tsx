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
	from,
	split,
} from '@apollo/client';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { TamaguiProvider, Text, View } from 'tamagui';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { DocumentType } from '@/graphql/generated';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { setContext } from '@apollo/client/link/context';
import { ApolloProviderWrapper } from '@/auth/ApolloProviderWrapper';
import {
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import DrawerLayout from './(drawer)/_layout';
import { Stack } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

// const authMiddleware = setContext(async (req, { headers }) => {
// 	const token = await getToken({ template: 'hasura' });
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: `Bearer ${token}`,
// 		},
// 	};
// });

// const httpLink = new HttpLink({
// 	uri: 'https://guiding-foxhound-54.hasura.app/v1/graphql',
// 	headers: {
// 		'x-hasura-admin-secret':
// 			'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
// 	},
// });

// const wsLink = new GraphQLWsLink(
// 	createClient({
// 		url: 'wss://guiding-foxhound-54.hasura.app/v1/graphql',
// 		connectionParams: {
// 			headers: {
// 				'x-hasura-admin-secret':
// 					'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
// 			},
// 		},
// 	})
// );

// const splitLink = split(
// 	({ query }) => {
// 		const definition = getMainDefinition(query);
// 		return (
// 			definition.kind === 'OperationDefinition' &&
// 			definition.operation === 'subscription'
// 		);
// 	},
// 	wsLink,
// 	httpLink
// );

// export const client = new ApolloClient({
// 	link: from([authMiddleware, splitLink]),
// 	cache: new InMemoryCache({
// 		typePolicies: {
// 			Query: {
// 				fields: {
// 					rotation: {
// 						merge(existing = [], incoming: any[]) {
// 							return [...incoming];
// 						},
// 					},
// 				},
// 			},
// 		},
// 	}),
// });

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

	return (
		<ClerkProvider tokenCache={tokenCache}>
			<TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<ApolloProviderWrapper>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<Stack screenOptions={{ headerShown: false }} />
						</GestureHandlerRootView>
					</ApolloProviderWrapper>
				</ThemeProvider>
			</TamaguiProvider>
		</ClerkProvider>
	);
}
