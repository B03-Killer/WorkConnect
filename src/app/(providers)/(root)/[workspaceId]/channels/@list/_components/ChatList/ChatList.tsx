'use client';

import { useEffect, useMemo } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { isEmpty } from '@/utils/isEmpty';
import { CHANNEL_TYPE } from '@/constants/channel';
import { useChannelHandlers } from '../../_hooks/useChannelHandlers';
import { useGetChannels } from '../../../_hooks/useChannelQuery';
import { handleSubscribeToChannels } from '../../_utils/subscribe';
import ChannelItem from '../ChannelItem';
import clsx from 'clsx';

type ChannelListPageProps = {
  className?: string;
};

const ChannelListPage = ({ className }: ChannelListPageProps) => {
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const { handleChatInserts, handleChannelUserUpdates } = useChannelHandlers();

  const { data: channels = [] } = useGetChannels(workspaceId);

  const channelIds = useMemo(() => {
    return channels.map((channel) => channel.channel_id).join(',');
  }, [channels]);

  useEffect(() => {
    if (isEmpty(channelIds)) return;

    handleSubscribeToChannels({
      channelIds,
      workspaceUserId,
      handleChatInserts: handleChatInserts({ workspaceId }),
      handleChannelUserUpdates: handleChannelUserUpdates({ workspaceId })
    });
  }, [channelIds]);

  if (isEmpty(channels)) return null;

  return (
    <ul className={clsx('relative z-[1]', className)}>
      {channels.map((item) => {
        const href =
          item.type === CHANNEL_TYPE.chat
            ? `/${workspaceId}/channels/${item.channel_id}`
            : `/${workspaceId}/video-channel/${item.channel_name}`;

        return (
          <ChannelItem
            {...item}
            href={href}
            key={item.channel_id}
            name={item.user_name ?? item.channel_name}
            user_count={item.is_dm ? undefined : item.user_count}
            user_thumbnail={item.user_thumbnail ?? undefined}
          />
        );
      })}
    </ul>
  );
};

export default ChannelListPage;
