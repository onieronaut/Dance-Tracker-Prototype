import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { GetRoomsType, RoomType } from '@/types/rooms';
import { getDancers } from '../users/database';
import dayjs from 'dayjs';

export const createRoom = async (data: { name: string }) => {
	const db = await openDatabase();

	const uniqueId = uuidv4();

	await db.runAsync(
		`INSERT INTO rooms (roomId, name, status, timestamp) VALUES (?, ?, 'Open', 0);`,
		[uniqueId, data.name]
	);

	console.log('Room created');

	return;
};

export const getRooms = async () => {
	const db = await openDatabase();

	const response: GetRoomsType[] =
		await db.getAllAsync(`SELECT rooms.roomId, rooms.name, rooms.status, rooms.timestamp, rooms.sessionId,
  		json_group_array(
     		users.name
  		) 
		AS users
		FROM
  			rooms
		LEFT JOIN users ON rooms.roomId = users.roomId
		GROUP BY
  			rooms.roomId
  		ORDER BY
  		CAST(SUBSTR(rooms.name, 6) AS INTEGER)
`);

	const rooms: RoomType[] = response.map((row) => {
		return {
			...row,
			users: JSON.parse(row.users),
		};
	});

	return rooms;
};
