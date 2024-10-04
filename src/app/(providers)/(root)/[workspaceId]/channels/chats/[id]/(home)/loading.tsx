import { PageAside, PageLayout, PageMain, PCHeader, PCWrapper, BottomBar } from '@/components/Layout/PageLayout';
import Loading from '@/components/Loading';
import ChannelListTopBar from '../../../_components/ChannelListTopBar';

const HomeLoading = () => {
  return (
    <PageLayout>
      <PageAside>
        <ChannelListTopBar />
      </PageAside>
      <PageMain className="h-dvh">
        {' '}
        <Loading />
      </PageMain>
      <BottomBar className="hidden lg:block" />
    </PageLayout>
  );
};

export default HomeLoading;
