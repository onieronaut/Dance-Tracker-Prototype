import { gql } from '../generated';

export const UpdateRotation = gql(/* GraphQL */ `
	mutation UpdateRotation(
		$updates: [RotationUpdates!] = {
			where: { id: { _eq: "" } }
			_set: { userId: "" }
		}
	) {
		updateRotationMany(updates: $updates) {
			returning {
				id
				index
				name
			}
		}
	}
`);
