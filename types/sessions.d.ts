export type GetSessionsType = {
	sessionId: string;
	userId: string;
	roomId: string;
	status: string;
	startTime: number;
	endTime: number;
};

export type SessionType = {
	sessionId: string;
	roomId: string;
	status: string;
	startTime: number;
	endTime: number;
	users: string[];
};
