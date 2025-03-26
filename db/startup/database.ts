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

	for (let i = 1; i < 19; i++) {
		const uniqueId = uuidv4();

		await db.runAsync(
			`INSERT INTO rooms (roomId, name, status, timestamp, sessionId) VALUES (?, 'Room ${i}', 'Open', 0, '');`,
			[uniqueId]
		);
	}

	return console.log('Rooms initialized');
};

export const initializeRotation = async () => {
	const db = await openDatabase();

	const hotboxId = uuidv4();

	await db.runAsync(
		`INSERT INTO rotation (rotationId, name, position, type, available) VALUES (?, 'Hotbox', 3, 'stage', ?);`,
		[hotboxId, true]
	);

	const sideStageId = uuidv4();

	await db.runAsync(
		`INSERT INTO rotation (rotationId, name, position, type, available) VALUES (?, 'Side Stage', 2, 'stage', ?);`,
		[sideStageId, true]
	);

	const centerStageId = uuidv4();

	await db.runAsync(
		`INSERT INTO rotation (rotationId, name, position, type, available) VALUES (?, 'Center Stage', 1, 'stage', ?);`,
		[centerStageId, true]
	);

	for (let i = 1; i < 10; i++) {
		const uniqueId = uuidv4();

		await db.runAsync(
			`INSERT INTO rotation (rotationId, name, position, type, available) VALUES (?, 'Queue ${i}', ${i}, 'queue', ?);`,
			[uniqueId, true]
		);
	}

	return console.log('Rotation initialized');
};
