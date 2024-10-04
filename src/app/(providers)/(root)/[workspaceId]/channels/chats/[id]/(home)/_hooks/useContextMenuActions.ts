import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { CHAT_TYPE } from '@/constants/chat';
import { useMutationChatMessage, useMutationDeleteChatMessage } from '../../../_hook/useChatMutation';
import { useCallback } from 'react';
import useChatContextMenuStore from '@/store/chatContextMenuStore';

export const useContextMenuActions = () => {
  const { id } = useParams();
  const { menu, closeMenu } = useChatContextMenuStore();
  const { openSnackBar } = useSnackBar();

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id)
  });

  const { mutateAsync: mutateDeleteChatMessage } = useMutationDeleteChatMessage({
    channel_id: Number(id)
  });

  const deleteChat = useCallback(async () => {
    if (!menu.id) return;

    await mutateDeleteChatMessage(menu.id);

    openSnackBar({ message: '삭제가 완료되었어요' });
    closeMenu();
  }, [menu.id]);

  const copyText = useCallback(() => {
    window.navigator.clipboard.writeText(menu.text || '').then(() => {
      openSnackBar({ message: '복사가 완료되었어요' });
    });

    closeMenu();
  }, [menu.text]);

  const handleNotice = useCallback(() => {
    mutateChatMessage({ content: menu.text || '', type: CHAT_TYPE.notice });
    closeMenu();
  }, [menu.text]);

  return { menu, closeMenu, copyText, deleteChat, handleNotice };
};
