import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannels';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ChatList } from './_feature/ChatList';
import { ContextMenu } from '../../../chats/[id]/(home)/_components/MessageSender';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatList />
      <ContextMenu />
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
