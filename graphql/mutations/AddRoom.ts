import { gql } from '../generated';

export const AddRoom = gql(/* GraphQL */ `
	mutation AddRoom($name: String = "") {
		insertRoomsOne(object: { name: $name, status: "Open" }) {
			name
			status
			id
		}
	}
`);
