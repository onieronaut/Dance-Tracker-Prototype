export type GetRoomsType = {
	roomId: string;
	sessionId: string;
	name: string;
	status: string;
	timestamp: number;
	users: string;
};

export type RoomType = {
	roomId: string;
	sessionId: string;
	name: string;
	status: string;
	timestamp: number;
	users: string[];
};
