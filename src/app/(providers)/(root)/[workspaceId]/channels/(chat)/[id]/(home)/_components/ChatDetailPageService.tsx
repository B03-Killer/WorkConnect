'use client';

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import useGetParamsChannelId from '../../../_hook/useGetParamsChannelId';
import { useMutationUpdateChannelActiveAt } from '../../../_hook/useChatMutation';
import useChatSubscription from '../_hooks/useChatSubscription';
import { useGetChatMessages, useGetLatestNotice, useGetUsersInChannel } from '../../../_hook/useChatQuery';
import { Chats } from './Chats';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import useChatContextMenuStore from '@/store/chatContextMenuStore';
import { getLastActiveAtForChannel } from '../_utils/getLastActiveAtForChannel';
import NoticeBar from './Messages/NoticeBar';
import MessagePanel from './Messages/MessagePanel';

const ChatDetailPageService = () => {
  const ref = useRef<HTMLDivElement>(null);
  const channelId = useGetParamsChannelId();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const { openMenu } = useChatContextMenuStore();

  const { data: latestNotice } = useGetLatestNotice({ id: channelId });
  const { mutate: updateChannelActiveAt } = useMutationUpdateChannelActiveAt();
  const { data: usersInChannel = {}, isPending, isLoading } = useGetUsersInChannel(Number(channelId));
  const { data: chatMessages = [], isPending: isPendingChatMessages } = useGetChatMessages({
    channel_id: Number(channelId)
  });
  const { payloadMessages } = useChatSubscription({
    channelId,
    usersInChannel,
    isPending,
    latestNoticeId: latestNotice?.id
  });

  const noticeUrl = `/${workspaceId}/channels/${channelId}/notice`;
  const lastActiveAt = useMemo(() => getLastActiveAtForChannel({ usersInChannel, workspaceUserId }), [usersInChannel]);

  useEffect(() => {
    if (!channelId) return;

    updateChannelActiveAt(channelId);
  }, [channelId]);

  useLayoutEffect(() => {
    if (!ref.current) return;

    ref.current.scrollIntoView({ block: 'end' });
  }, [isPendingChatMessages, payloadMessages, isLoading]);

  return (
    <MessagePanel>
      <NoticeBar latestNotice={latestNotice} href={noticeUrl} />
      <article className="flex-grow overflow-y-scroll px-4 scroll-container">
        <div className="relative flex flex-col gap-6 py-4" ref={ref}>
          <Chats
            data={[...chatMessages, ...payloadMessages]}
            usersInChannel={usersInChannel}
            workspaceUserId={workspaceUserId}
            openMenu={openMenu}
            workspaceId={workspaceId}
            noticeUrl={noticeUrl}
            lastActiveAt={lastActiveAt}
          />
        </div>
      </article>
    </MessagePanel>
  );
};

export default ChatDetailPageService;
