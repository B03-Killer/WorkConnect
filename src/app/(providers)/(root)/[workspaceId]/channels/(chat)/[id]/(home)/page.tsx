import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannels';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ChatList } from './_feature/ChatList';
import ContextMenu from './_feature/ContextMenu';
import SenderModule from './_feature/SenderModule';
import { useState } from 'react';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const handleOpenPanel = () => setIsOpenPanel((prev) => !prev);
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatList />
      <ContextMenu />
      <SenderModule isOpenPanel={isOpenPanel} handleOpenPanel={handleOpenPanel} />
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
