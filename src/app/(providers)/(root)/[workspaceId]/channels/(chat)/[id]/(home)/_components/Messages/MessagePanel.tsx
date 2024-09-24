'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { useState } from 'react';
import { Sender } from '../Sender';

const MessagePanel = ({ children }: StrictPropsWithChildren) => {
  const [isOpenPanel, setIsOpenPanel] = useState(false);

  const handleOpenPanel = () => {
    setIsOpenPanel((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col flex-grow h-[calc(100dvh+45px)] lg:h-[calc(100dvh-84px)] transform ease-in-out duration-300 ${
        isOpenPanel ? 'translate-y-[-96px]' : 'translate-y-[0px]'
      } lg:translate-y-0`}
    >
      {children}
      <Sender handleOpenPanel={handleOpenPanel} />
      {isOpenPanel && <div className="fixed top-0 left-0 w-full h-full z-40 lg:hidden" onClick={handleOpenPanel} />}
    </div>
  );
};

export default MessagePanel;
