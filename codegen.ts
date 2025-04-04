import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: [
		{
			'https://guiding-foxhound-54.hasura.app/v1/graphql': {
				headers: {
					'x-hasura-admin-secret':
						'hhjMjX0Dr84ZQAmijY99wnCq9hxuTw2YEEph613ineP2hddtLFvLbyWC6bKKv6t9',
				},
			},
		},
	],
	documents: ['./**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		'./graphql/': {
			preset: 'client',
			presetConfig: {
				gqlTagName: 'gql',
				fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
			},
			config: {
				namingConvention: {
					typeNames: 'change-case-all#pascalCase',
				},
				scalars: {
					uuid: 'string',
					timestamptz: 'string',
				},
			},
		},
		'./schema.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true,
			},
		},
	},
};

export default config;
