import { gql } from '../generated';

export const StartSessionMutation = gql(/* GraphQL */ `
	mutation StartSession(
		$roomId: uuid = ""
		$data: [UserSessionsInsertInput!] = {}
		$userIds: [uuid!] = ""
	) {
		insertSessionsOne(
			object: { roomId: $roomId, userSessions: { data: $data } }
		) {
			id
		}
		updateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: "In Use" }) {
			id
		}
		updateUsersMany(
			updates: { where: { id: { _in: $userIds } }, _set: { status: "In Room" } }
		) {
			returning {
				id
			}
		}
	}
`);
