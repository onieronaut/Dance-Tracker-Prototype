import { v4 as uuidv4 } from 'uuid';
import { openDatabase } from '../database';
import { RoomType } from '@/types/rooms';
import { getDancers } from '../users/database';
import dayjs from 'dayjs';
import { GetSessionsType, SessionType } from '@/types/sessions';

export const startSession = async (roomId: string, userIds: string[]) => {
	const db = await openDatabase();

	const timestamp = dayjs().unix() * 1000;
	const sessionId = uuidv4();

	await db.runAsync(
		'INSERT INTO sessions (sessionId, roomId,  startTime, endTime, status) VALUES (?, ?, ?, 0, "In Progress");',
		[sessionId, roomId, timestamp]
	);

	for (const userId of userIds) {
		const userSessionId = uuidv4();

		await db.runAsync(
			'INSERT INTO user_sessions (userSessionId, sessionId, roomId, userId, startTime, endTime) VALUES (?, ?, ?, ?, ?, 0);',
			[userSessionId, sessionId, roomId, userId, timestamp]
		);

		await db.runAsync(
			'UPDATE users SET status = "In Room", roomId = ? WHERE userId = ?;',
			[roomId, userId]
		);
	}

	await db.runAsync(
		'UPDATE rooms SET status = "In Use", timestamp = ?, sessionId = ? WHERE roomId = ?;',
		[timestamp, sessionId, roomId]
	);

	console.log('Session started');

	return;
};

export const endSession = async (sessionId: string) => {
	const db = await openDatabase();

	const timestamp = dayjs().unix() * 1000;

	const session = await getSession(sessionId);

	await db.runAsync(
		'UPDATE sessions set status = "Completed", endTime = ? WHERE sessionId = ?;',
		[timestamp, sessionId]
	);

	for (const userId in session.users) {
		await db.runAsync(
			'UPDATE users SET status = "Active", roomId = "" WHERE userId = ?;',
			[userId]
		);

		// user session status?
		await db.runAsync(
			'UPDATE user_sessions SET endTime = ? WHERE sessionId = ?;',
			[timestamp, sessionId]
		);
	}

	await db.runAsync(
		'UPDATE rooms set status = "Open", timestamp = 0, sessionId = "" WHERE roomId = ?;',
		[session.roomId]
	);

	return console.log('Session ended');
};

export const getSessions = async () => {
	const db = await openDatabase();

	const response: GetSessionsType[] = await db.getAllAsync(
		'SELECT s.sessionId, s.startTime, s.endTime, s.status, u.userId, r.roomId FROM sessions s JOIN user_sessions us ON s.sessionId = us.sessionId JOIN users u ON us.userId = u.userId JOIN rooms r ON r.roomId = s.roomId;'
	);

	const sessions: SessionType[] = response.reduce((acc, row) => {
		let session = acc.find((session) => session.sessionId === row.sessionId);

		if (!session) {
			session = {
				sessionId: row.sessionId,
				roomId: row.roomId,
				startTime: row.startTime,
				endTime: row.endTime,
				status: row.status,
				users: [],
			};

			acc.push(session);
		}

		session.users.push(row.userId);

		return acc;
	}, []);

	return sessions;
};

export const getSession = async (sessionId: string) => {
	const db = await openDatabase();

	const response: GetSessionsType[] = await db.getAllAsync(
		'SELECT s.sessionId, s.startTime, s.endTime, s.status, u.userId, r.roomId FROM sessions s JOIN user_sessions us ON s.sessionId = us.sessionId JOIN users u ON us.userId = u.userId JOIN rooms r ON r.roomId = s.roomId WHERE s.sessionId = ?;',
		[sessionId]
	);

	if (response.length === 0) return;

	const session: SessionType = response?.reduce(
		(acc, row) => {
			if (!acc.sessionId) {
				acc.sessionId = row.sessionId;
				acc.roomId = row.roomId;
				acc.startTime = row.startTime;
				acc.endTime = row.endTime;
				acc.status = row.status;
				acc.users = [];
			}

			acc.users.push(row.userId);

			return acc;
		},
		{
			sessionId: '',
			roomId: '',
			startTime: 0,
			endTime: 0,
			status: '',
			users: [],
		}
	);

	return session;
};
