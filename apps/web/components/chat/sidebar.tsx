'use client';

import { Hash, MessageSquare, Search, Settings, User } from 'lucide-react';
import { channels, users } from './data';
import { cn } from '@/lib/utils';

export function Sidebar({
	selectedChannelId,
	onSelectChannel,
	className,
}: {
	selectedChannelId: string;
	onSelectChannel: (id: string) => void;
	className?: string;
}) {
	return (
		<div className={cn('flex h-full flex-col bg-[#3F0E40] text-[#cfc3cf]', className)}>
			{/* Header */}
			<div className="flex h-12 items-center justify-between border-b border-[#5d2c5d] px-4 hover:bg-[#350d36] cursor-pointer transition-colors">
				<h1 className="font-bold text-white truncate">Home Admin Workspace</h1>
				<button className="rounded-full p-1 hover:bg-[#5d2c5d]">
					<Settings className="h-4 w-4" />
				</button>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
				{/* Sections */}
				<div className="mb-6">
					<div className="px-4 py-1 flex items-center justify-between group cursor-pointer text-[#cfc3cf] hover:text-white">
						<h2 className="text-sm font-medium">Channels</h2>
					</div>
					<div className="mt-1 space-y-[1px]">
						{channels.map((channel) => (
							<button
								key={channel.id}
								onClick={() => onSelectChannel(channel.id)}
								className={cn(
									'w-full flex items-center px-4 py-1 hover:bg-[#350d36] transition-colors group',
									selectedChannelId === channel.id && 'bg-[#1164A3] text-white hover:bg-[#1164A3]',
								)}
							>
								<span className="mr-2 opacity-70">
									{channel.type === 'public' ? <Hash className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
								</span>
								<span className="truncate">{channel.name}</span>
								{channel.unreadCount && (
									<span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 rounded-full">
										{channel.unreadCount}
									</span>
								)}
							</button>
						))}
					</div>
				</div>

				<div className="mb-6">
					<div className="px-4 py-1 flex items-center justify-between group cursor-pointer text-[#cfc3cf] hover:text-white">
						<h2 className="text-sm font-medium">Direct Messages</h2>
					</div>
					<div className="mt-1 space-y-[1px]">
						{users
							.filter((u) => u.id !== 'me')
							.map((user) => (
								<button
									key={user.id}
									onClick={() => onSelectChannel(user.id)}
									className={cn(
										'w-full flex items-center px-4 py-1 hover:bg-[#350d36] transition-colors group',
										selectedChannelId === user.id && 'bg-[#1164A3] text-white hover:bg-[#1164A3]',
									)}
								>
									<div className="relative mr-2">
										<img src={user.avatar} alt={user.name} className="h-4 w-4 rounded-sm" />
										<span
											className={cn(
												'absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#3F0E40]',
												user.status === 'online' && 'bg-green-500',
												user.status === 'busy' && 'bg-red-500',
												user.status === 'away' && 'bg-yellow-500',
												user.status === 'offline' && 'border-gray-400 bg-transparent',
											)}
										/>
									</div>
									<span className="truncate opacity-90">{user.name}</span>
								</button>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
