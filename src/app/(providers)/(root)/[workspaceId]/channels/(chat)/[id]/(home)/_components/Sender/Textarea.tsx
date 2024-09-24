'use client';

import PlusIcon from '@/icons/Plus.svg';
import SmileIcon from '@/icons/Smile.svg';
import SendIcon from '@/icons/Send.svg';
import { useRef, useState } from 'react';
import { useMutationChatMessage } from '../../../../_hook/useChatMutation';
import useGetParamsChannelId from '../../../../_hook/useGetParamsChannelId';

type MessageTextareaProps = {
  handleOpenPanel: () => void;
};

const handleResizeHeight = (textArea: HTMLTextAreaElement | null) => {
  if (!textArea) return;
  textArea.style.height = 'auto';
  textArea.style.height = textArea.scrollHeight + 'px';
};

const Textarea = ({ handleOpenPanel }: MessageTextareaProps) => {
  const [isComposing, setIsComposing] = useState(false);
  const channelId = useGetParamsChannelId();

  const ref = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { mutate: mutateChatMessage } = useMutationChatMessage({
    channel_id: channelId
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ref.current?.value || ref.current?.value.trim() === '') return;

    mutateChatMessage({ content: ref.current.value, type: 'text' });
    ref.current.value = '';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleResizeHeight(ref.current);

    if (isComposing) return;
    if (window.innerWidth < 1024) return;
    if (!(event.key === 'Enter' && !event.shiftKey)) return;

    event.preventDefault();
    buttonRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex py-4 w-full bg-white p-4 pb-[14px] gap-[10px] border-t border-grey50 items-center">
        <button
          type="button"
          onClick={handleOpenPanel}
          aria-label="파일 추가"
          className="w-6 h-6 rounded-full bg-primary200Main flex justify-center items-center shrink-0 lg:hidden"
        >
          <PlusIcon className="w-5 h-5 text-white stroke-current" />
        </button>
        <div className="relative w-full">
          <textarea
            ref={ref}
            rows={1}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
            className="rounded w-full px-2 py-[12px] bg-[#fafafa] text-[12px] leading-[130%] tracking-[-0.24px] pr-9 resize-none h-[40px] max-h-[86px] block"
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <button type="button" className="absolute right-2 bottom-[10px] z-10" aria-label="이모지 선택">
            <SmileIcon className="w-5 h-5 text-grey400" />
          </button>
        </div>
        <button ref={buttonRef} type="submit" aria-label="전송">
          <SendIcon className="w-5 h-5 text-grey700Black" />
        </button>
      </div>
    </form>
  );
};

export default Textarea;
