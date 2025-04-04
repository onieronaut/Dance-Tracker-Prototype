import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { UserType } from '@/types/users';

export const createUser = async (data: { name: string; type: string }) => {
	const db = await openDatabase();

	const uniqueId = uuidv4();

	await db.runAsync(
		`INSERT INTO users (userId, name, status, room, type) VALUES (?, ?, 'Active', '', ?);`,
		[uniqueId, data.name, data.type]
	);

	console.log('User created');

	return;
};

export const getDancers = async () => {
	const db = await openDatabase();

	const dancers: UserType[] = await db.getAllAsync(
		'SELECT * FROM users WHERE type = "dancer";'
	);

	console.log('dancers', dancers);

	return dancers;
};
