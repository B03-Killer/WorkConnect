import { useGetPrefetchChannelInfo } from '@/hooks/queries/useChannels';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  const queryClient = await useGetPrefetchChannelInfo(Number(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Chat Detail Page</h1>
      </div>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
