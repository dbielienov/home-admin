export type User = {
	id: string;
	name: string;
	avatar: string;
	status: 'online' | 'offline' | 'busy' | 'away';
};

export type Channel = {
	id: string;
	name: string;
	type: 'public' | 'private';
	unreadCount?: number;
};

export type Message = {
	id: string;
	content: string;
	senderId: string;
	timestamp: string;
	reactions?: { emoji: string; count: number }[];
	channelId: string;
	replies?: Message[];
};

export const users: User[] = [
	{
		id: 'u1',
		name: 'Alice Johnson',
		avatar: 'https://i.pravatar.cc/150?u=u1',
		status: 'online',
	},
	{
		id: 'u2',
		name: 'Bob Smith',
		avatar: 'https://i.pravatar.cc/150?u=u2',
		status: 'busy',
	},
	{
		id: 'u3',
		name: 'Charlie Brown',
		avatar: 'https://i.pravatar.cc/150?u=u3',
		status: 'offline',
	},
	{
		id: 'me',
		name: 'You',
		avatar: 'https://i.pravatar.cc/150?u=me',
		status: 'online',
	},
];

export const channels: Channel[] = [
	{ id: 'c1', name: 'general', type: 'public' },
	{ id: 'c2', name: 'random', type: 'public', unreadCount: 2 },
	{ id: 'c3', name: 'engineering', type: 'private' },
	{ id: 'c4', name: 'design', type: 'public' },
];

export const initialMessages: Message[] = [
	{
		id: 'm1',
		content: 'Hey everyone! Welcome to the new chat interface.',
		senderId: 'u1',
		timestamp: '10:00 AM',
		reactions: [{ emoji: '👋', count: 2 }],
		channelId: 'c1',
		replies: [
			{
				id: 'r1',
				content: 'Thanks Alice! Excited to be here.',
				senderId: 'u2',
				timestamp: '10:02 AM',
				channelId: 'c1',
			},
		],
	},
	{
		id: 'm2',
		content: 'Looks great! Love the Slack vibes.',
		senderId: 'u2',
		timestamp: '10:05 AM',
		channelId: 'c1',
	},
	{
		id: 'm3',
		content: 'Has anyone seen the latest design mocks?',
		senderId: 'u3',
		timestamp: '10:15 AM',
		channelId: 'c1',
	},
	{
		id: 'm4',
		content: "I'll post them in the #design channel shortly.",
		senderId: 'me',
		timestamp: '10:16 AM',
		reactions: [{ emoji: '👍', count: 1 }],
		channelId: 'c1',
	},
	{
		id: 'm5',
		content: 'Perfect, thanks!',
		senderId: 'u3',
		timestamp: '10:20 AM',
		channelId: 'c1',
	},
	{
		id: 'm6',
		content: 'Anyone up for lunch?',
		senderId: 'u2',
		timestamp: '12:00 PM',
		channelId: 'c2',
	},
	{
		id: 'm7',
		content: 'I am!',
		senderId: 'u1',
		timestamp: '12:01 PM',
		channelId: 'c2',
	},
	{
		id: 'm8',
		content: 'Hey, do you have a minute?',
		senderId: 'u1',
		timestamp: '1:00 PM',
		channelId: 'u1',
	},
];
