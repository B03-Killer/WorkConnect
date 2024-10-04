'use client';

import Typography from '@/components/Typography';
import FolderIcon from '@/icons/Folder.svg';
import { handleDownloadFile } from '@/utils/file';
import { useParams } from 'next/navigation';
import { useGetChannelDocuments } from '../../../_hook/useChatQuery';

const FileListPage = () => {
  const { id } = useParams();
  const { data: documents = [] } = useGetChannelDocuments(Number(id));

  return (
    <ul className="grid grid-cols-2 gap-x-2 gap-y-3 py-[22px] px-4">
      {documents.map((file) => (
        <li
          key={file.id}
          className="rounded-[6px] bg-bgBackground1 shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] px-3 py-4 h-[134px]"
        >
          <button
            onClick={() => handleDownloadFile(file.content, file.content.split('/').pop() || '')}
            className="flex flex-col justify-between w-full h-full"
          >
            <FolderIcon />
            <div>
              <Typography variant="Subtitle14px" className="text-[#2F323C]">
                {file.content.split('/').pop() || ''}
              </Typography>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileListPage;
