import { gql } from '../generated';

export const ChangeRotationMutation = gql(/* GraphQL */ `
	mutation ChangeRotation(
		$endTime: timestamptz = ""
		$updateUserRotation: [uuid!] = ""
		$updateRotationMany: [RotationUpdates!] = {
			where: { id: { _eq: "" } }
			_set: { userId: "" }
		}
		$insertUserRotation: [UserRotationInsertInput!] = {
			rotationId: ""
			userId: ""
		}
	) {
		updateRotationMany(updates: $updateRotationMany) {
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
			where: { id: { _in: $updateUserRotation } }
			_set: { endTime: $endTime }
		) {
			affectedRows
		}
		insertUserRotation(objects: $insertUserRotation) {
			affectedRows
		}
	}
`);
