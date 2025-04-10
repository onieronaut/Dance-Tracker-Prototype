import { gql } from '../generated';

export const Rotation = gql(/* GraphQL */ `
	query Rotation {
		rotation(orderBy: { index: ASC }, where: { type: { _eq: "queue" } }) {
			id
			index
			type
			name
			currentUserRotation {
				id
				user {
					id
					name
					status
					activeSession {
						id
						startTime
						endTime
						room {
							id
							name
						}
					}
				}
			}
		}
	}
`);
