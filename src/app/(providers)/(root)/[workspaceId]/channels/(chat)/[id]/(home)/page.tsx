import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getChannelInfoOptions } from '../../_utils/getQueryOptions';
import { DetailLayout, ChatDetailPageService } from './_components';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelInfoOptions(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailLayout>
        <ChatDetailPageService />
      </DetailLayout>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
