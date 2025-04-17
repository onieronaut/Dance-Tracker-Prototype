import { gql } from '../generated';

export const ClockInMutation = gql(/* GraphQL */ `
	mutation ClockIn {
		clockIn {
			success
		}
	}
`);
