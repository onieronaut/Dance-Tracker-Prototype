import { gql } from '../generated';

export const ClockOutMutation = gql(/* GraphQL */ `
	mutation ClockOut($id: uuid = "") {
		updateUsersByPk(
			pkColumns: { id: $id }
			_set: { shiftStatus: "Clocked Out", status: "Unavailable" }
		) {
			shiftStatus
		}
	}
`);
