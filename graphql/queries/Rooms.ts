import { gql } from '../generated';

export const RoomsQuery = gql(/* GraphQL */ `
	query Rooms {
		rooms(orderBy: { name: ASC }) {
			id
			...RoomsList
			...Room
		}
	}
`);
