'use client';

import { PageMain } from '@/components/Layout/PageLayout';
import { TopBar } from '@/components/Layout/TopBar';
import { XIcon } from '@/icons';
import { MenuButton } from '../../../../_components/TopBarButtons';
import Avatar from '@/components/Avatar';
import { useState } from 'react';
import { useFetchChannelInfos } from '../_hooks/useFetchChannelName';
import Sidebar from '../_components/Sidebar';
import { StrictPropsWithChildren } from '@/types/common';
import { useParams } from 'next/navigation';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useGetQueryDataUsersInChannel } from '../../../_hook/useChatQuery';
import { GetUsersInChannelResponseItem } from '@/types/channel';

export type ChannelUsersTypes = {
  sortedMembers: GetUsersInChannelResponseItem[];
  workspaceUserId: string;
  workspaceId: number;
};

const ChatSectionWrapper = ({ children }: StrictPropsWithChildren) => {
  const { id } = useParams();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { name: channelName, channel_thumbnail: channelThumbnail } = useFetchChannelInfos();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const usersInChannel = useGetQueryDataUsersInChannel(Number(id));

  const members = usersInChannel || {};
  const sortedMembers = Object.values(members).sort((a, _) => (a.workspace_user_id === workspaceUserId ? -1 : 1));
  const pathname = `/${workspaceId}/channels/${id}`;

  const channelUsersProps: ChannelUsersTypes = {
    sortedMembers,
    workspaceUserId,
    workspaceId
  };

  const handleToggleSideBar = () => {
    setIsOpenSidebar((prev) => !prev);
  };

  return (
    <PageMain className="h-dvh">
      <TopBarWrapper
        channelName={channelName}
        channelThumbnail={channelThumbnail}
        onClick={handleToggleSideBar}
        isOpenSidebar={isOpenSidebar}
      />
      {children}
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        channelName={channelName}
        channelUsersProps={channelUsersProps}
        pathname={pathname}
      />
      <div
        className={`w-full h-full bg-[#333] z-40 fixed top-0 left-0 transition-opacity duration-300 ${isOpenSidebar ? 'opacity-70' : 'opacity-0 pointer-events-none'} lg:opacity-0`}
        onClick={handleToggleSideBar}
      />
    </PageMain>
  );
};

type TopBarWrapperProps = {
  channelName: string;
  channelThumbnail: string;
  onClick: () => void;
  isOpenSidebar: boolean;
};

const TopBarWrapper = ({ channelName, channelThumbnail, onClick, isOpenSidebar }: TopBarWrapperProps) => {
  return (
    <TopBar
      title={
        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <Avatar size="40px" className="hidden lg:flex" src={channelThumbnail} />
          {channelName}
        </div>
      }
      Icon4={isOpenSidebar ? <XIcon onClick={onClick} /> : <MenuButton onClick={onClick} />}
    />
  );
};

export default ChatSectionWrapper;
