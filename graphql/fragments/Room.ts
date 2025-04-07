import { gql } from '../generated';

export const RoomFragment = gql(/* GraphQL */ `
	fragment Room on Rooms {
		id
		name
		status
		activeSession {
			id
			startTime
			endTime
			activeUsers {
				id
				user {
					id
					name
				}
			}
		}
	}
`);
