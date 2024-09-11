'use client';

import { memo, useCallback, useMemo, type ComponentProps } from 'react';
import { CHAT_TYPE } from '@/constants/chat';
import clsx from 'clsx';
import type { ContextMenuContextType } from '../../_provider/ContextMenuProvider';
import ChatImage from '../../../../_components/ChatImage';
import ChatVideo from '../../../../_components/ChatVideo';
import useLongPress from '@/hooks/useLongPress';
import ChatFile from './ChatFile';
import ChatText from './ChatText';
import ChatNotice from '../ChatNotice';

type HandleContextMenuEventProps = React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLVideoElement>;

type ChatMessageProps = {
  content: string;
  type: string;
  isMe: boolean;
  id: number;
  noticeUrl: string;
  openContextMenu: ContextMenuContextType['openContextMenu'];
};

const DATA_TARGET = 'message';

const componentsMap: Record<string, (props: any) => JSX.Element> = {
  [CHAT_TYPE.image]: (props: any) => <ChatImage {...props} />,
  [CHAT_TYPE.document]: (props: any) => <ChatFile {...props} />,
  [CHAT_TYPE.video]: (props: any) => <ChatVideo {...props} />,
  [CHAT_TYPE.text]: (props: any) => <ChatText {...props} />,
  [CHAT_TYPE.notice]: (props: any) => <ChatNotice {...props} />
};

const getStyles = (type: string, isMe: boolean) => {
  const baseStyles = {
    margin: isMe ? '' : 'ml-[40px] mt-[6px]',
    rounded: isMe ? 'rounded-br-none' : 'rounded-tl-none',
    background: isMe ? 'bg-[#EBECFE]' : 'bg-grey50',
    select: 'prevent-select'
  };

  const additionalStyles: Record<string, string> = {
    [CHAT_TYPE.image]: 'rounded-lg w-[200px] h-auto',
    [CHAT_TYPE.document]: '',
    [CHAT_TYPE.video]: 'rounded-lg',
    [CHAT_TYPE.text]: clsx(baseStyles.background, baseStyles.rounded),
    [CHAT_TYPE.notice]: baseStyles.rounded
  };

  return clsx(baseStyles.margin, baseStyles.select, additionalStyles[type]);
};

export const ChatMessage = memo(({ content, type, isMe, id, noticeUrl, openContextMenu }: ChatMessageProps) => {
  const className = useMemo(() => getStyles(type, isMe), [type, isMe]);

  const handleContextMenu = useCallback(
    (event: React.TouchEvent | HandleContextMenuEventProps) => {
      event.preventDefault?.();

      const targetElement = (event.target as HTMLElement)?.closest('[data-target="message"]')?.getBoundingClientRect();
      if (!targetElement) return;

      openContextMenu({ targetElement, id, type, text: content, isMe });
    },
    [openContextMenu, id, type, content, isMe]
  );

  const { onTouchStart, onTouchEnd } = useLongPress(handleContextMenu);

  const Component = componentsMap[type];
  if (!Component) return null;

  const commonProps = {
    'data-target': DATA_TARGET,
    onContextMenu: handleContextMenu,
    onTouchStart,
    onTouchEnd
  };

  const componentProps: Record<string, any> = {
    [CHAT_TYPE.text]: { ...commonProps, children: content },
    [CHAT_TYPE.notice]: { ...commonProps, children: content, src: noticeUrl },
    [CHAT_TYPE.image]: { ...commonProps, src: content, width: 300, height: 300 },
    [CHAT_TYPE.document]: { ...commonProps, src: content },
    [CHAT_TYPE.video]: { ...commonProps, src: content, width: 200, controls: true }
  };

  return <Component {...componentProps[type]} className={className} />;
});
