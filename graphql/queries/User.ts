import { gql } from '../generated';

export const UserQuery = gql(/* GraphQL */ `
	query GetUser($id: uuid = "") {
		usersByPk(id: $id) {
			id
			name
			loginStatus
			shiftStatus
			status
			role
		}
	}
`);
