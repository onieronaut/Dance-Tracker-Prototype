import { gql } from '../generated';

export const RotationSlot = gql(/* GraphQL */ `
	fragment Slot on Rotation {
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
`);
