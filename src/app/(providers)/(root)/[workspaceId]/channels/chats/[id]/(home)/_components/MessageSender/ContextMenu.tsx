'use client';

import Typography from '@/components/Typography';
import CopyIcon from '@/icons/Copy.svg';
import HashIcon from '@/icons/Hash.svg';
import TrashIcon from '@/icons/Trash.svg';
import { CHAT_TYPE } from '@/constants/chat';
import clsx from 'clsx';
import { useContextMenuActions } from '../../_hooks/useContextMenuActions';

const ContextMenu = () => {
  const { menu, closeMenu, copyText, deleteChat, handleNotice } = useContextMenuActions();
  const { isOpen, position, type, isMe } = menu;

  if (!isOpen) return null;

  const menuItems = [
    { condition: type === CHAT_TYPE.text, title: '복사', onClick: copyText, icon: <CopyIcon /> },
    { condition: true, title: '공지', onClick: handleNotice, icon: <HashIcon /> },
    { condition: isMe, title: '삭제', onClick: deleteChat, icon: <TrashIcon /> }
  ];

  return (
    <>
      <div
        style={{ top: position.y }}
        className={clsx(
          'fixed rounded-[6px] bg-bgBackground1 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] z-50 w-[154px] flex p-4 gap-[20px] flex-col',
          isMe ? 'right-[16px]' : 'left-[56px]',
          position.isAtTop ? '' : 'translate-y-[-100%]'
        )}
      >
        {menuItems
          .filter((item) => item.condition)
          .map((item, index) => (
            <button type="button" className="flex items-center justify-between" key={index} onClick={item.onClick}>
              <Typography variant="Subtitle16px" color="grey900">
                {item.title}
              </Typography>
              {item.icon}
            </button>
          ))}
      </div>
      <div className="fixed top-0 left-0 w-full h-full z-40" onClick={closeMenu} />
    </>
  );
};

export default ContextMenu;
