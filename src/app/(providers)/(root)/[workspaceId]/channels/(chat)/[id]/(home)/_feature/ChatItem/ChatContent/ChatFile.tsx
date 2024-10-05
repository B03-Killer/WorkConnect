'use client';

import { handleDownloadFile } from '@/utils/file';
import { ChatFileProps } from './types';

const ChatFile = ({ href, name, ...props }: ChatFileProps) => {
  return (
    <button
      type="button"
      onClick={() => handleDownloadFile(href, name)}
      className="rounded-lg border-b-2 border-gray-300 bg-white p-2 shadow-xl"
      {...props}
    >
      파일: {name}
    </button>
  );
};

export default ChatFile;
