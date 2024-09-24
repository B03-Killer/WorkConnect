'use client';

import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useFetchChannelInfos } from '../_hooks/useFetchChannelName';
import { TopBar } from '@/components/Layout/TopBar';
import ChannelList from '../../../../_components/ChannelList';
import ChannelListTopBar from '../../../../_components/ChannelListTopBar';
import { MenuButton } from '../../../../_components/TopBarButtons';
import Avatar from '@/components/Avatar';
import { XIcon } from '@/icons';

const DetailLayout = ({ children }: StrictPropsWithChildren) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { name: channelName, channel_thumbnail: channelThumbnail } = useFetchChannelInfos();

  const handleOpenSidebar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <>
      <PageLayout>
        <PageAside>
          <div className="mr-[-8px]">
            <ChannelListTopBar />
            <ChannelList />
          </div>
        </PageAside>
        <PageMain className="h-dvh">
          <TopBar
            title={<TopBarTitle channelName={channelName} channelThumbnail={channelThumbnail} />}
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

const TopBarTitle = ({ channelName, channelThumbnail }: { channelName: string; channelThumbnail: string }) => {
  return (
    <div className="flex items-center gap-3 justify-center lg:justify-start">
      <Avatar size="40px" className="hidden lg:flex" src={channelThumbnail} />
      {channelName}
    </div>
  );
};

export default DetailLayout;
