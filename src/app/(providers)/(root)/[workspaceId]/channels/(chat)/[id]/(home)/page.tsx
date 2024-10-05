import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannels';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ChatList } from './_feature/ChatList';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatList />
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
