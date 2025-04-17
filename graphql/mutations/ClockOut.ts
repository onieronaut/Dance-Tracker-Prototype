import { gql } from '../generated';

export const ClockOutMutation = gql(/* GraphQL */ `
	mutation ClockOut {
		clockOut {
			success
		}
	}
`);
