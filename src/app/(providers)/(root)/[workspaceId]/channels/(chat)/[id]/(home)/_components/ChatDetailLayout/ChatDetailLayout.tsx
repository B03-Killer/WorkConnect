'use client';

import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { useFetchChannelName } from '../../_hooks/useFetchChannelName';
import { TopBar } from '@/components/Layout/TopBar';
import ChannelList from '../../../../../_components/ChannelList';
import ChannelListTopBar from '../../../../../_components/ChannelListTopBar';
import { MenuButton } from '../../../../../_components/TopBarButtons';
import Avatar from '@/components/Avatar';
import { XIcon } from '@/icons';

const ChatDetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const channelName = useFetchChannelName();

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  // TODO: BottomBar 모바일에서는 안 보여야해서 컴포넌트 나눈거임
  return (
    <>
      <PageLayout>
        <PageAside>
          <div className="mr-[-8px]">
            <ChannelListTopBar />
            <ChannelList />
          </div>
        </PageAside>
        <PageMain>
          <TopBar
            title={<TopBarTitle channelName={channelName} />}
            Icon4={isOpenSidebar ? <XIcon onClick={handleOpenSidebar} /> : <MenuButton onClick={handleOpenSidebar} />}
          />
          {children}
        </PageMain>
        <BottomBar className="hidden lg:block" />
      </PageLayout>
      <Sidebar isOpenSidebar={isOpenSidebar} handleOpenSidebar={handleOpenSidebar} channelName={channelName} />
    </>
  );
};

const TopBarTitle = ({ channelName }: { channelName: string }) => {
  return (
    <div className="flex items-center gap-3 justify-center lg:justify-start">
      <Avatar size="40px" className="hidden lg:flex" />
      {channelName}
    </div>
  );
};

export default ChatDetailLayout;
