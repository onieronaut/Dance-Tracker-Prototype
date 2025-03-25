import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { RoomType } from '@/types/rooms';
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

	const rooms: RoomType[] = await db.getAllAsync('SELECT * FROM rooms;');

	return rooms;
};
