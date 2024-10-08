'use client';

import { PlusIcon, SendIcon, SmileIcon } from '@/icons';
import { useRef } from 'react';

export type HandleSubmitProps = {
  event: React.FormEvent<HTMLFormElement>;
  ref: React.RefObject<HTMLTextAreaElement>;
};

export type HandleKeyDownProps = {
  event: React.KeyboardEvent<HTMLTextAreaElement>;
  ref: React.RefObject<HTMLTextAreaElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

type TextareaProps = {
  handleOpenPanel: () => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
  handleSubmit: ({ event, ref }: HandleSubmitProps) => void;
  handleKeyDown: ({ event, ref, buttonRef }: HandleKeyDownProps) => void;
};

const Textarea = ({
  handleOpenPanel,
  onCompositionStart,
  onCompositionEnd,
  handleSubmit,
  handleKeyDown
}: TextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <form onSubmit={(event) => handleSubmit({ event, ref })}>
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
            onKeyDown={(event) => handleKeyDown({ event, ref, buttonRef })}
            placeholder="메시지를 입력하세요"
            className="rounded w-full px-2 py-[12px] bg-[#fafafa] text-[12px] leading-[130%] tracking-[-0.24px] pr-9 resize-none h-[40px] max-h-[86px] block"
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
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
