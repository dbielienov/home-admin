'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { ChatArea } from './chat-area';
import { Message } from './data';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function ChatLayout() {
	const [selectedChannelId, setSelectedChannelId] = useState('c1');
	const [selectedThread, setSelectedThread] = useState<Message | null>(null);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<div className="flex h-screen w-full overflow-hidden bg-white">
			{/* Desktop Sidebar */}
			<div className="hidden md:block h-full w-64 shrink-0">
				<Sidebar selectedChannelId={selectedChannelId} onSelectChannel={setSelectedChannelId} />
			</div>

			{/* Mobile Sidebar (Sheet) */}
			<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
				<SheetContent side="left" className="p-0 w-80 border-r-0 bg-[#3F0E40] text-[#cfc3cf]">
					<SheetTitle className="sr-only">Navigation Menu</SheetTitle>
					<SheetDescription className="sr-only">Navigate between channels and direct messages</SheetDescription>
					<Sidebar
						selectedChannelId={selectedChannelId}
						onSelectChannel={(id) => {
							setSelectedChannelId(id);
							setMobileMenuOpen(false);
						}}
					/>
				</SheetContent>
			</Sheet>

			<ChatArea
				selectedChannelId={selectedChannelId}
				selectedThread={selectedThread}
				onSelectThread={setSelectedThread}
				onMobileMenuClick={() => setMobileMenuOpen(true)}
			/>
		</div>
	);
}
