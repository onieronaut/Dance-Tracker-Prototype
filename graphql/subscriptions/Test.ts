import { gql } from '../generated';

export const Test = gql(/* GraphQL */ `
	query Test {
		rotation(where: { type: { _eq: "queue" } }) {
			id
			index
			name
		}
	}
`);
