import {
	ApolloProvider,
	ApolloClient,
	HttpLink,
	from,
	InMemoryCache,
	split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { useAuth, useSession } from '@clerk/clerk-expo';
import { createClient } from 'graphql-ws';
import { useMemo } from 'react';

export const ApolloProviderWrapper = ({ children }) => {
	const { getToken } = useAuth();

	const apolloClient = useMemo(() => {
		const authMiddleware = setContext(async (req, { headers }) => {
			const token = await getToken({ template: 'hasura' });

			console.log('[token]', token);

			return {
				headers: {
					...headers,
					// 'x-hasura-admin-secret':
					// 	'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
					authorization: `Bearer ${token}`,
				},
			};
		});

		const httpLink = new HttpLink({
			uri: 'https://guiding-foxhound-54.hasura.app/v1/graphql',
		});

		const wsLink = new GraphQLWsLink(
			createClient({
				url: 'wss://guiding-foxhound-54.hasura.app/v1/graphql',
				connectionParams: async () => {
					const token = await getToken({ template: 'hasura' });

					return {
						headers: {
							authorization: `Bearer ${token}`,
						},
					};
				},
				// connectionParams: {
				// 	headers: {
				// 		// 'x-hasura-admin-secret':
				// 		// 	'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
				// 	},
				// },
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

		return new ApolloClient({
			link: from([authMiddleware, splitLink]),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							rotation: {
								merge(existing = [], incoming: any[]) {
									return [...incoming];
								},
							},
						},
					},
				},
			}),
		});
	}, [getToken]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
