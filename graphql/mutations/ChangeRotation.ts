import { gql } from '../generated';

export const ChangeRotationMutation = gql(/* GraphQL */ `
	mutation ChangeRotation(
		$endTime: timestamptz = ""
		$userRotationIds: [uuid!] = ""
		$updates: [RotationUpdates!] = {
			where: { id: { _eq: "" } }
			_set: { userId: "" }
		}
		$objects: [UserRotationInsertInput!] = { rotationId: "", userId: "" }
	) {
		updateRotationMany(updates: $updates) {
			returning {
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
		updateUserRotation(
			where: { id: { _in: $userRotationIds } }
			_set: { endTime: $endTime }
		) {
			affectedRows
		}
		insertUserRotation(objects: $objects) {
			affectedRows
		}
	}
`);
