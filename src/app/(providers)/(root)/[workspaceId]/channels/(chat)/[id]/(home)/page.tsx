import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelInfoOptions(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Chat Detail Page</h1>
      </div>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
