'use client';

import { useMemo } from 'react';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import useGetParamsChannelId from './useGetParamsChannelId';
import { useGetUsersInChannel } from '@/hooks/queries/useChannels';
import { useGetChatMessages } from '@/hooks/queries/useChat';
import { getChannelLastActiveTime } from '../_utils/getChannelLastActiveTime';
import useChatSubscription from './useChatSubscription';
import useChatNotice from './useChatNotice';

const useChatMessageList = () => {
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();

  const { noticeUrl, latestNotice } = useChatNotice();
  const { data: usersInChannel = {}, isPending } = useGetUsersInChannel(Number(channelId));
  const { data: chatMessages = [] } = useGetChatMessages(Number(channelId));

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
            src: userInfo.profile_image,
            userName: userInfo.name,
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
