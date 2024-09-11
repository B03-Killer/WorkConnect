'use client';

import { handleDownloadFile } from '@/utils/file';
import { ComponentProps } from 'react';

type ChatFileProps = ComponentProps<'button'> & { src: string };

const ChatFile = ({ src, ...props }: ChatFileProps) => {
  const fileName = src.split('/').pop() || '';

  return (
    <button
      type="button"
      onClick={() => handleDownloadFile(src, fileName)}
      className="rounded-lg border-b-2 border-gray-300 bg-white p-2 shadow-xl"
      {...props}
    >
      파일: {fileName}
    </button>
  );
};

export default ChatFile;
