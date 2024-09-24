'use client';

import FileButton from './FileButton';
import useFileUpload from '../../_hooks/useFileUpload';
import { ImageIcon, PaperclipIcon, VideoIcon } from '@/icons';
import { STORAGE_BUCKET_NAME } from '../../../../_constants/constants';

type StorageBucketNameKeys = keyof typeof STORAGE_BUCKET_NAME;

const UtilsMenu = ({ handleOpenPanel }: { handleOpenPanel: () => void }) => {
  const { handleFileUpload } = useFileUpload(handleOpenPanel);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    handleFileUpload({
      blob: files[0],
      name: name as StorageBucketNameKeys
    });
  };

  return (
    <div className="w-full bg-white gap-2 px-4 grid grid-cols-4 pt-3 pb-[15px] lg:flex lg:pt-0">
      <FileButton title="사진" name="imageFile" accept="image/*" onChange={handleChange}>
        <ImageIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
      <FileButton title="동영상" name="videoFile" accept="video/*" onChange={handleChange}>
        <VideoIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
      <FileButton title="파일" name="documentFile" accept=".pdf,.doc,.docx" onChange={handleChange}>
        <PaperclipIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
    </div>
  );
};

export default UtilsMenu;
