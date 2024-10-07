'use client';

import { useEffect, useMemo } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { isEmpty } from '@/utils/isEmpty';
import { CHANNEL_TYPE } from '@/constants/channel';
import clsx from 'clsx';
import { handleSubscribeToChannels } from '../_utils/subscribe';
import { useGetChannels } from '../_hooks/useChannelQuery';
import ChannelItem from './ChannelItem';
import { useChannelHandlers } from '../_hooks/useChannelHandlers';
import useGetParamsChannelId from '../(chat)/[id]/(home)/_hooks/useGetParamsChannelId';

type ChannelListPageProps = {
  className?: string;
};

const ChannelList = ({ className }: ChannelListPageProps) => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const { handleChatInserts, handleChannelUserUpdates } = useChannelHandlers();

  const { data: channels = [] } = useGetChannels(workspaceId);

  const channelIds = useMemo(() => {
    return channels.map((channel) => channel.channel_id).join(',');
  }, [channels]);

  useEffect(() => {
    if (isEmpty(channelIds)) return;

    const channel = handleSubscribeToChannels({
      channelIds,
      workspaceUserId,
      handleChatInserts: handleChatInserts({ workspaceId }),
      handleChannelUserUpdates: handleChannelUserUpdates({ workspaceId })
    }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [channelIds]);

  return (
    <ul className={clsx('relative z-[1]', className)}>
      {channels.map((item) => {
        const href =
          item.type === CHANNEL_TYPE.chat
            ? `/${workspaceId}/channels/${item.channel_id}`
            : `/${workspaceId}/video-channel/${item.channel_name}`;
        const isActive = channelId === item.channel_id;

        return (
          <ChannelItem
            {...item}
            href={href}
            key={item.channel_id}
            isActive={isActive}
            name={item.channel_name ?? '(알 수 없음)'}
            user_count={item.is_dm ? undefined : item.user_count}
            channel_thumbnail={item.channel_thumbnail ?? undefined}
            un_read_chat={item.un_read_chat ?? undefined}
          />
        );
      })}
    </ul>
  );
};

export default ChannelList;
