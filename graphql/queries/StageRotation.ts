import { gql } from '../generated';

export const StageRotationQuery = gql(/* GraphQL */ `
	query StageRotation {
		rotation(orderBy: { index: ASC }, where: { type: { _eq: "stage" } }) {
			id
			index
			type
			name
			currentUserRotation {
				id
				user {
					id
					name
				}
			}
		}
	}
`);
