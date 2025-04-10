import { gql } from '../generated';

export const RoomsSubscription = gql(/* GraphQL */ `
	subscription Rooms {
		rooms(orderBy: { name: ASC }) {
			id
			...RoomsList
			...Room
		}
	}
`);
