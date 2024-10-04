import { StrictPropsWithChildren } from '@/types/common';

const ChatContainer = ({ children, isOpenPanel }: StrictPropsWithChildren<{ isOpenPanel: boolean }>) => {
  return (
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+45px)] lg:h-[calc(100dvh-84px)] transform ease-in-out duration-300 ${
        isOpenPanel ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      } lg:translate-y-0`}
    >
      {children}
    </div>
  );
};

export default ChatContainer;
