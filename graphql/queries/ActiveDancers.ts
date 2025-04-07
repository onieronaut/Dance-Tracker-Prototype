import { gql } from '../generated';

export const ActiveDancersQuery = gql(/* GraphQL */ `
	query ActiveDancers {
		users(
			orderBy: { name: ASC }
			where: { role: { _eq: "dancer" }, status: { _eq: "Active" } }
		) {
			id
			name
			status
		}
	}
`);
