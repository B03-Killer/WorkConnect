import useFileUpload from '../../_hooks/useFileUpload';
import { STORAGE_BUCKET_NAME } from '../../../../_constants/constants';
import { useMutationChatMessage } from '../../../../_hook/useChatMutation';
import useGetParamsChannelId from '../../../../../(chat)/[id]/(home)/_hooks/useGetParamsChannelId';
import { useState } from 'react';
import Textarea, { type HandleKeyDownProps, type HandleSubmitProps } from '../../_components/MessageSender/Textarea';
import { ContextMenu, UtilsMenu } from '../../_components/MessageSender';

type SenderModuleProps = {
  isOpenPanel: boolean;
  handleOpenPanel: () => void;
};

type StorageBucketNameKeys = keyof typeof STORAGE_BUCKET_NAME;

const handleResizeHeight = (textArea: HTMLTextAreaElement | null) => {
  if (!textArea) return;
  textArea.style.height = 'auto';
  textArea.style.height = textArea.scrollHeight + 'px';
};

const SenderModule = ({ isOpenPanel, handleOpenPanel }: SenderModuleProps) => {
  const { handleFileUpload } = useFileUpload(handleOpenPanel);
  const channelId = useGetParamsChannelId();
  const [isComposing, setIsComposing] = useState(false);

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: channelId
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    handleFileUpload({
      blob: files[0],
      name: name as StorageBucketNameKeys
    });
  };

  const handleSubmit = ({ event, ref }: HandleSubmitProps) => {
    event.preventDefault();

    if (!ref.current?.value || ref.current?.value.trim() === '') return;

    mutateChatMessage({ content: ref.current.value, type: 'text' });
    ref.current.value = '';
  };

  const handleKeyDown = ({ event, ref, buttonRef }: HandleKeyDownProps) => {
    handleResizeHeight(ref.current);

    if (isComposing) return;
    if (window.innerWidth < 1024) return;
    if (!(event.key === 'Enter' && !event.shiftKey)) return;

    event.preventDefault();
    buttonRef.current?.click();
  };

  return (
    <>
      <div className="relative z-50">
        <Textarea
          handleOpenPanel={handleOpenPanel}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
        />
        <UtilsMenu handleChange={handleChange} />
        <ContextMenu />
      </div>
      {isOpenPanel && <div className="fixed top-0 left-0 w-full h-full z-40 lg:hidden" onClick={handleOpenPanel} />}
    </>
  );
};

export default SenderModule;
