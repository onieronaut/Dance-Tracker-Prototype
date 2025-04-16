import { gql } from '../generated';

export const QueueRotationQuery = gql(/* GraphQL */ `
	query QueueRotation {
		activeRotation(orderBy: { index: ASC }, where: { type: { _eq: "queue" } }) {
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
					}
				}
			}
		}
	}
`);
