import { gql } from '../generated';

export const QueueSlotFragment = gql(/* GraphQL */ `
	fragment QueueSlot on ActiveRotation {
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
`);
