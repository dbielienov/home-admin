import { db } from '@repo/api/db';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
	connectionStateRecovery: {
		maxDisconnectionDuration: 2 * 60 * 1000,
		skipMiddlewares: false,
	},
});

interface MessagePayload {
	user: {
		id: string;
		name: string;
		email?: string;
		image?: string;
	};
	text: string;
	replyToId?: number;
}

io.on('connection', async (socket) => {
	if (socket.handshake.auth.user) {
		console.log('User connected:', socket.handshake.auth.user);
		socket.broadcast.emit('user connected', {
			id: socket.id,
			name: socket.handshake.auth.user.name,
			email: socket.handshake.auth.user.email,
			image: socket.handshake.auth.user.image,
		});
	}

	socket.on('activity', async (data) => {
		socket.broadcast.emit('activity', data.user);
	});

	socket.on('message', async (data: MessagePayload) => {
		try {
			console.log('Message received:', data);
		} catch (err) {
			console.error('Error saving message:', err);
			socket.emit('error', { message: 'Failed to send message' });
		}
	});

	socket.on('disconnect', () => {
		if (socket.handshake.auth.user) {
			socket.broadcast.emit('user disconnected', {
				id: socket.id,
				name: socket.handshake.auth.user.name,
				email: socket.handshake.auth.user.email,
				image: socket.handshake.auth.user.image,
			});
		}
	});
});

server.listen(8085, '0.0.0.0', () => {
	console.log('✅ Server running on port 8085');
});
