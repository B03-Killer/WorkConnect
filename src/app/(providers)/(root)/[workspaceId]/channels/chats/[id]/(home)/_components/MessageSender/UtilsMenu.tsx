import FileButton from './FileButton';
import { ImageIcon, PaperclipIcon, VideoIcon } from '@/icons';

type UtilsMenuProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UtilsMenu = ({ handleChange }: UtilsMenuProps) => {
  return (
    <div className="w-full bg-white gap-2 px-4 grid grid-cols-4 pt-3 pb-[15px] lg:flex lg:pt-0">
      <FileButton title="사진" name="imageFile" accept="image/*" handleChange={handleChange}>
        <ImageIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
      <FileButton title="동영상" name="videoFile" accept="video/*" handleChange={handleChange}>
        <VideoIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
      <FileButton title="파일" name="documentFile" accept=".pdf,.doc,.docx" handleChange={handleChange}>
        <PaperclipIcon className="stroke-white lg:stroke-grey400" />
      </FileButton>
    </div>
  );
};

export default UtilsMenu;
