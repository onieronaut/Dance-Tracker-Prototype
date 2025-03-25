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

export const addDancersToRoom = async (roomId: string, userIds: string[]) => {
	const db = await openDatabase();

	const dancers = await getDancers();

	const timestamp = dayjs().unix() * 1000;

	for (const userId of userIds) {
		const uniqueId = uuidv4();

		await db.runAsync(
			'INSERT INTO dancers_in_rooms (sessionId, roomId, dancerId, startTime, endTime) VALUES (?, ?, ?, ?, 0);',
			[uniqueId, roomId, userId, timestamp]
		);

		await db.runAsync(
			'UPDATE users SET status = "In Room", room = ? WHERE userId = ?;',
			[roomId, userId]
		);
	}

	await db.runAsync(
		'UPDATE rooms SET status = "In Use", timestamp = ? WHERE roomId = ?;',
		[timestamp, roomId]
	);

	console.log('dancers added to room');

	return;
};
