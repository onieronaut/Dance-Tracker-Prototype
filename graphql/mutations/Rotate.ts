import { gql } from '../generated';

export const RotateMutation = gql(/* GraphQL */ `
	mutation Rotate(
		$updates: [RotationUpdates!] = {
			where: { id: { _eq: "" } }
			_set: { userId: "" }
		}
		$_in: [uuid!] = ""
		$endTime: timestamptz = ""
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
			where: { id: { _in: $_in } }
			_set: { endTime: $endTime }
		) {
			affectedRows
		}
		insertUserRotation(objects: $objects) {
			affectedRows
		}
	}
`);
