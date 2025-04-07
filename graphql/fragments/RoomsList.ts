import { gql } from '../generated';

export const RoomsListFragment = gql(/* GraphQL */ `
	fragment RoomsList on Rooms {
		id
		...Room
	}
`);
