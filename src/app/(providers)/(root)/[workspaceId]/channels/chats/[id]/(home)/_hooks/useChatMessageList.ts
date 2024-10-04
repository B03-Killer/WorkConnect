'use client';

import { useMemo } from 'react';
import { useGetChatMessages, useGetUsersInChannel } from '../../../_hook/useChatQuery';
import useChatSubscription from './useChatSubscription';
import { getChannelLastActiveTime } from '../_utils/getChannelLastActiveTime';
import useChatNotice from './useChatNotice';
import useGetParamsChannelId from '../../../_hook/useGetParamsChannelId';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

const useChatMessageList = () => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const { noticeUrl, latestNotice } = useChatNotice();
  const { data: usersInChannel = {}, isPending } = useGetUsersInChannel(Number(channelId));

  const { data: chatMessages = [] } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { payloadMessages } = useChatSubscription({
    channelId,
    usersInChannel,
    isPending,
    latestNoticeId: latestNotice?.id
  });

  const lastActiveAt = useMemo(() => getChannelLastActiveTime({ usersInChannel, workspaceUserId }), [usersInChannel]);

  const chatMessageList = useMemo(() => {
    return [...chatMessages, ...payloadMessages].map((chat) => {
      const isMe = chat.workspace_user_id === workspaceUserId;

      const userInfo = chat.workspace_user_id ? usersInChannel[chat.workspace_user_id] : null;
      const profileUrl = `/${workspaceId}/profile/${chat.workspace_user_id}`;
      const otherProfileProps = userInfo
        ? {
            profileImage: userInfo.profile_image,
            name: userInfo.name,
            href: profileUrl
          }
        : undefined;
      return {
        chat,
        otherProfileProps,
        noticeUrl,
        isMe
      };
    });
  }, [chatMessages, payloadMessages]);

  return { chatMessageList, lastActiveAt };
};

export default useChatMessageList;
