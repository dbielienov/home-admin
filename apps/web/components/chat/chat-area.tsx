'use client';

import { Smile, Paperclip, Send, Hash, Search, Bell, MoreVertical, MessageSquare, Menu } from 'lucide-react';
import { initialMessages, users, channels, Message } from './data';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function ChatArea({
	selectedChannelId,
	selectedThread,
	onSelectThread,
	onMobileMenuClick,
}: {
	selectedChannelId: string;
	selectedThread: Message | null;
	onSelectThread: (message: Message | null) => void;
	onMobileMenuClick?: () => void;
}) {
	const [messages, setMessages] = useState(initialMessages);
	const [inputValue, setInputValue] = useState('');
	const [threadInputValue, setThreadInputValue] = useState('');

	const selectedChannel = channels.find((c) => c.id === selectedChannelId);
	const selectedUser = users.find((u) => u.id === selectedChannelId);
	const channelName = selectedChannel ? selectedChannel.name : selectedUser?.name;

	const filteredMessages = messages.filter((m) => m.channelId === selectedChannelId);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			content: inputValue,
			senderId: 'me',
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			channelId: selectedChannelId,
		};

		setMessages([...messages, newMessage]);
		setInputValue('');
	};

	const handleSendThreadMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!threadInputValue.trim() || !selectedThread) return;

		const newReply: Message = {
			id: Date.now().toString(),
			content: threadInputValue,
			senderId: 'me',
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			channelId: selectedChannelId,
		};

		const updatedMessages = messages.map((msg) => {
			if (msg.id === selectedThread.id) {
				return {
					...msg,
					replies: [...(msg.replies || []), newReply],
				};
			}
			return msg;
		});

		setMessages(updatedMessages);
		// Update selected thread to show new reply immediately
		const updatedThread = updatedMessages.find((m) => m.id === selectedThread.id);
		if (updatedThread) {
			onSelectThread(updatedThread);
		}
		setThreadInputValue('');
	};

	return (
		<div className="flex h-full flex-1 overflow-hidden">
			<div className="flex h-full flex-1 flex-col bg-white min-w-0">
				{/* Header */}
				<header className="flex h-16 items-center justify-between border-b px-4 py-2 shrink-0">
					<div className="flex items-center min-w-0 gap-2">
						{/* Mobile Menu Button */}
						<button
							onClick={onMobileMenuClick}
							className="md:hidden p-2 hover:bg-gray-100 rounded-md -ml-2"
							aria-label="Open menu"
						>
							<Menu className="h-5 w-5 text-gray-700" />
						</button>
						<h2 className="text-lg font-bold flex items-center truncate">
							{selectedChannel ? (
								<Hash className="mr-1 h-5 w-5 text-gray-500 shrink-0" />
							) : (
								<div className="mr-2 h-2 w-2 rounded-full bg-green-500 shrink-0" />
							)}
							{channelName}
						</h2>
					</div>
					<div className="flex items-center space-x-4 text-gray-500 shrink-0">
						<div className="relative hidden md:block">
							<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
							<input
								type="text"
								placeholder="Search"
								className="h-8 rounded-md border bg-gray-50 pl-8 pr-4 text-sm focus:border-blue-500 focus:outline-none"
							/>
						</div>
						<button className="hover:bg-gray-100 p-2 rounded-md">
							<Bell className="h-5 w-5" />
						</button>
						<button className="hover:bg-gray-100 p-2 rounded-md">
							<MoreVertical className="h-5 w-5" />
						</button>
					</div>
				</header>

				{/* Messages Area */}
				<div className="flex-1 overflow-y-auto p-4 space-y-6">
					{filteredMessages.map((message, index) => {
						const sender = users.find((u) => u.id === message.senderId);
						const showHeader = index === 0 || filteredMessages[index - 1].senderId !== message.senderId;

						return (
							<div key={message.id} className={cn('group flex items-start space-x-3', !showHeader && 'mt-1')}>
								{showHeader ? (
									<img
										src={sender?.avatar}
										alt={sender?.name}
										className="h-9 w-9 rounded-md cursor-pointer hover:opacity-80"
									/>
								) : (
									<div className="w-9" /> // Spacer for alignment
								)}

								<div className="flex-1 min-w-0">
									{showHeader && (
										<div className="flex items-baseline">
											<span className="font-bold mr-2 cursor-pointer hover:underline">{sender?.name}</span>
											<span className="text-xs text-gray-500">{message.timestamp}</span>
										</div>
									)}
									<p className="text-gray-900 leading-relaxed break-words">{message.content}</p>
									{message.reactions && (
										<div className="mt-1 flex space-x-1">
											{message.reactions.map((reaction, i) => (
												<button
													key={i}
													className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs hover:bg-gray-200 border border-transparent hover:border-gray-300"
												>
													<span>{reaction.emoji}</span>
													<span className="font-medium">{reaction.count}</span>
												</button>
											))}
										</div>
									)}
									{(message.replies?.length || 0) > 0 && (
										<div
											className="mt-1 flex items-center cursor-pointer group/thread"
											onClick={() => onSelectThread(message)}
										>
											<div className="flex -space-x-1 mr-2">
												{message.replies?.slice(0, 3).map((reply, i) => {
													const replySender = users.find((u) => u.id === reply.senderId);
													return (
														<img
															key={i}
															src={replySender?.avatar}
															className="h-5 w-5 rounded-md border border-white"
															alt=""
														/>
													);
												})}
											</div>
											<span className="text-xs text-blue-600 font-medium group-hover/thread:underline">
												{message.replies?.length} replies
											</span>
											<span className="text-xs text-gray-400 ml-2 opacity-0 group-hover/thread:opacity-100 transition-opacity">
												View thread
											</span>
										</div>
									)}
								</div>
								<div className="opacity-0 group-hover:opacity-100 transition-opacity">
									<button
										onClick={() => onSelectThread(message)}
										className="p-1 hover:bg-gray-100 rounded text-gray-500"
										title="Reply in thread"
									>
										<MessageSquare className="h-4 w-4" />
									</button>
								</div>
							</div>
						);
					})}
				</div>

				{/* Input Area */}
				<div className="p-4 pb-6 shrink-0">
					<div className="rounded-xl border border-gray-300 bg-white shadow-sm focus-within:border-gray-400 focus-within:shadow-md transition-all">
						{/* Toolbar */}
						<div className="flex items-center space-x-1 bg-gray-50 px-2 py-1.5 rounded-t-xl border-b border-gray-200">
							<button className="p-1 hover:bg-gray-200 rounded">
								<span className="font-bold text-xs font-serif">B</span>
							</button>
							<button className="p-1 hover:bg-gray-200 rounded">
								<span className="italic text-xs font-serif">I</span>
							</button>
							<button className="p-1 hover:bg-gray-200 rounded">
								<span className="line-through text-xs font-serif">S</span>
							</button>
							<div className="h-4 w-px bg-gray-300 mx-1" />
							<button className="p-1 hover:bg-gray-200 rounded flex items-center text-xs text-gray-600">
								<Paperclip className="h-3 w-3 mr-1" /> Add
							</button>
						</div>
						<form onSubmit={handleSendMessage} className="flex items-end p-2">
							<input
								type="text"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder={`Message #${channelName || 'unknown'}`}
								className="max-h-60 min-h-[40px] w-full resize-none bg-transparent px-2 py-2 focus:outline-none"
							/>
							<div className="flex items-center pb-1 pl-2">
								<button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
									<Smile className="h-5 w-5" />
								</button>
								<button
									type="submit"
									disabled={!inputValue.trim()}
									className={cn(
										'ml-1 p-2 rounded-md transition-all',
										inputValue.trim()
											? 'bg-[#007a5a] text-white hover:bg-[#148567]'
											: 'bg-gray-100 text-gray-400 cursor-not-allowed',
									)}
								>
									<Send className="h-4 w-4" />
								</button>
							</div>
						</form>
					</div>
					<div className="mt-1 text-center text-xs text-gray-400">
						<strong>Shift + Enter</strong> to add a new line
					</div>
				</div>
			</div>

			{/* Thread View */}
			{selectedThread && (
				<div className="absolute md:relative inset-0 md:inset-auto md:w-80 border-l bg-gray-50 flex flex-col shadow-xl z-10">
					<div className="flex items-center justify-between px-4 py-3 border-b bg-white">
						<h3 className="font-bold text-sm">Thread</h3>
						<button onClick={() => onSelectThread(null)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
							<span className="sr-only">Close</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-4 w-4"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
					</div>
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{/* Original Message */}
						<div className="flex items-start space-x-3">
							<img
								src={users.find((u) => u.id === selectedThread.senderId)?.avatar}
								alt=""
								className="h-8 w-8 rounded-md"
							/>
							<div>
								<div className="flex items-baseline">
									<span className="font-bold text-sm mr-2">
										{users.find((u) => u.id === selectedThread.senderId)?.name}
									</span>
									<span className="text-xs text-gray-500">{selectedThread.timestamp}</span>
								</div>
								<p className="text-sm text-gray-900">{selectedThread.content}</p>
							</div>
						</div>

						<div className="relative flex items-center py-2">
							<div className="flex-grow border-t border-gray-200"></div>
							<span className="flex-shrink-0 mx-4 text-xs text-gray-400">
								{selectedThread.replies?.length || 0} replies
							</span>
							<div className="flex-grow border-t border-gray-200"></div>
						</div>

						{/* Replies */}
						{selectedThread.replies?.map((reply) => (
							<div key={reply.id} className="flex items-start space-x-3">
								<img src={users.find((u) => u.id === reply.senderId)?.avatar} alt="" className="h-8 w-8 rounded-md" />
								<div>
									<div className="flex items-baseline">
										<span className="font-bold text-sm mr-2">{users.find((u) => u.id === reply.senderId)?.name}</span>
										<span className="text-xs text-gray-500">{reply.timestamp}</span>
									</div>
									<p className="text-sm text-gray-900">{reply.content}</p>
								</div>
							</div>
						))}
					</div>

					{/* Thread Input */}
					<div className="p-4 border-t bg-white">
						<form onSubmit={handleSendThreadMessage}>
							<div className="rounded-lg border border-gray-300 focus-within:border-blue-500 focus-within:shadow-sm transition-all">
								<input
									type="text"
									value={threadInputValue}
									onChange={(e) => setThreadInputValue(e.target.value)}
									placeholder="Reply..."
									className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
								/>
								<div className="flex justify-end p-1 bg-gray-50 rounded-b-lg border-t border-gray-100">
									<button
										type="submit"
										disabled={!threadInputValue.trim()}
										className={cn(
											'p-1.5 rounded transition-colors',
											threadInputValue.trim()
												? 'bg-[#007a5a] text-white hover:bg-[#148567]'
												: 'bg-gray-200 text-gray-400',
										)}
									>
										<Send className="h-3 w-3" />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
