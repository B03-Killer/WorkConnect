'use client';

import { useState } from 'react';
import NoticeBar from '../../_components/NoticeBar';
import ChatModule from './ChatModule';
import ChatContainer from '../../_components/ChatContainer';
import useChatNotice from '../../_hooks/useChatNotice';
import SenderModule from './SenderModule';

const ChatSection = () => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const handleOpenPanel = () => setIsOpenPanel((prev) => !prev);

  const { latestNotice, noticeUrl } = useChatNotice();

  return (
    <ChatContainer isOpenPanel={isOpenPanel}>
      <NoticeBar latestNotice={latestNotice} href={noticeUrl} />
      <ChatModule />
      <SenderModule isOpenPanel={isOpenPanel} handleOpenPanel={handleOpenPanel} />
    </ChatContainer>
  );
};

export default ChatSection;
