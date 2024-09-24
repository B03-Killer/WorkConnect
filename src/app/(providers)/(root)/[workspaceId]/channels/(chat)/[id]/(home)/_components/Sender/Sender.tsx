import Textarea from './Textarea';
import UtilsMenu from './UtilsMenu';
import ContextMenu from './ContextMenu';

type MessageSenderProps = {
  handleOpenPanel: () => void;
};

const Sender = ({ handleOpenPanel }: MessageSenderProps) => {
  return (
    <div className="relative z-50">
      <Textarea handleOpenPanel={handleOpenPanel} />
      <UtilsMenu handleOpenPanel={handleOpenPanel} />
      <ContextMenu />
    </div>
  );
};

export default Sender;
