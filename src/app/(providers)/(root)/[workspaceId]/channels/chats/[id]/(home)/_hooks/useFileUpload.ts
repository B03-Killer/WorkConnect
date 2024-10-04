'use client';

import { mbToBytes } from '@/utils/file';
import { STORAGE_BUCKET_NAME } from '../../../_constants/constants';
import { useMutationChatMessage, useMutationUploadFile } from '../../../_hook/useChatMutation';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { ChatType } from '@/types/chat';
import { useCallback } from 'react';

type StorageBucketNameKeys = keyof typeof STORAGE_BUCKET_NAME;
const MAX_FILE_SIZE = 3;

export type UploadFileProps = {
  blob: Blob;
  name: StorageBucketNameKeys;
};

const CHAT_TYPE: Record<StorageBucketNameKeys, ChatType['type']> = {
  imageFile: 'image',
  videoFile: 'video',
  documentFile: 'document'
};

const useFileUpload = (onFinish: () => void) => {
  const { id } = useParams();
  const { openSnackBar } = useSnackBar();

  const { mutateAsync: mutateUploadFile } = useMutationUploadFile({
    onSuccess: onFinish
  });

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: Number(id)
  });

  const handleFileUpload = useCallback(async ({ blob, name }: UploadFileProps) => {
    if (blob.size >= mbToBytes(MAX_FILE_SIZE)) {
      openSnackBar({ message: `${MAX_FILE_SIZE}MB가 넘는 파일은 업로드할 수 없어요` });
      onFinish();
      return;
    }

    const formData = new FormData();
    formData.append('file', blob);

    const { data } = await mutateUploadFile({
      formData,
      storagePath: STORAGE_BUCKET_NAME[name],
      maxFileSize: MAX_FILE_SIZE
    });

    if (!data) {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      onFinish();
      return;
    }

    mutateChatMessage({ content: data, type: CHAT_TYPE[name] });
  }, []);

  return { handleFileUpload };
};

export default useFileUpload;
