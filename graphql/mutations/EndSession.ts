import { gql } from '../generated';

export const EndSessionMutation = gql(/* GraphQL */ `
	mutation EndSession(
		$roomId: uuid = ""
		$sessionId: uuid = ""
		$endTime: timestamptz = ""
		$userSessionIds: [uuid!] = ""
		$userIds: [uuid!] = ""
	) {
		updateRoomsByPk(pkColumns: { id: $roomId }, _set: { status: "Open" }) {
			id
		}
		updateSessionsByPk(
			pkColumns: { id: $sessionId }
			_set: { status: "Complete", endTime: $endTime }
		) {
			id
		}
		updateUserSessionsMany(
			updates: {
				where: { id: { _in: $userSessionIds } }
				_set: { status: "Complete", endTime: $endTime }
			}
		) {
			returning {
				id
			}
		}
		updateUsersMany(
			updates: { where: { id: { _in: $userIds } }, _set: { status: "Active" } }
		) {
			returning {
				id
			}
		}
	}
`);
