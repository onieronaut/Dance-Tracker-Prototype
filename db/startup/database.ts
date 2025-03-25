import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import dayjs from 'dayjs';

export const initializeUsers = async () => {
	const db = await openDatabase();

	const names = ['Diamond', 'Rose', 'Star', 'Crystal', 'Jade'];

	for (let i = 0; i < names.length; i++) {
		const uniqueId = uuidv4();

		await db.runAsync(
			`INSERT INTO users (userId, name, status, roomId, type) VALUES (?, ?, 'Active', '', 'dancer');`,
			[uniqueId, names[i]]
		);
	}

	return console.log('Users initialized');
};

export const initializeRooms = async () => {
	const db = await openDatabase();

	for (let i = 1; i < 18; i++) {
		const uniqueId = uuidv4();

		await db.runAsync(
			`INSERT INTO rooms (roomId, name, status, timestamp, sessionId) VALUES (?, 'Room ${i}', 'Open', 0, '');`,
			[uniqueId]
		);
	}

	return console.log('Rooms initialized');
};
