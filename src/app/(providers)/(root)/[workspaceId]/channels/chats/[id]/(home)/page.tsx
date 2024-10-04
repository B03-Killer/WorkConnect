import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getChannelInfoOptions } from '../../_utils/getQueryOptions';
import AsideSection from './_sections/AsideSection';
import ChatSectionWrapper from './_sections/ChatSectionWrapper';
import ChatSection from './_sections/ChatSection';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelInfoOptions(Number(id)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AsideSection />
      <ChatSectionWrapper>
        <ChatSection />
      </ChatSectionWrapper>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
