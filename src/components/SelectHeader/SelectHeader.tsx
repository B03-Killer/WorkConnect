'use client';

import ToDoAddButton from '@/app/(providers)/(root)/[workspaceId]/to-do-list/_components/ToDoAddButton';
import TopSelect from '@/components/TopSelect';
import Typography from '@/components/Typography';
import useWorkspaceList from '@/hooks/useWorkspaceList';
import ChevronDownIcon from '@/icons/ChevronDownIcon.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import WorkConnectLogo from '@/icons/WorkConnectLogo.svg';
import useUserStore from '@/store/userStore';
import clsx from 'clsx';
import { useState } from 'react';

interface SelectHeaderProps {
  workspaceId: number;
  isTodoList?: boolean;
  isMainPage?: boolean;
  isFull?: boolean;
  isHidden?: boolean;
  className?: string;
}

/** TODO: @deprecated */
const SelectHeader = ({
  workspaceId,
  isTodoList = false,
  isFull = false,
  isHidden = false,
  className
}: SelectHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userId = useUserStore((state) => state.userId);
  const { workspaceInfo, isPending, isError } = useWorkspaceList(workspaceId, userId);

  if (isError || !workspaceInfo) {
    return;
  }

  if (isPending) {
    return;
  }

  const workspaceList = workspaceInfo.workspaceListData;
  const selectedWorkspace = workspaceList.filter((workspace) => workspace.id === workspaceId)[0];

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header
      className={clsx(
        `${isFull ? 'w-full' : ' '} ${isHidden ? 'hidden' : 'flex flex-row'} ${isTodoList ? 'w-full lg:w-[384px]' : ''} 
      sticky top-0 items-center justify-between z-40 bg-white pt-[14px] px-[16px] pb-[12px] 
      lg:bg-[#F4F4F6] lg:h-[84px] lg:flex lg:border-[#E5E7EB] lg:border-b-[1px]`,
        className
      )}
    >
      <div className="flex flex-row gap-[8px]">
        <div className="hidden lg:flex items-center justify-center w-[32px] h-[32px] pl-[5px] pt-[11px] pb-[10px] pr-[6px] border-[1px] border-[#C9CCD4] rounded-[6px]">
          <WorkConnectLogo />
        </div>
        <button onClick={handleClick} className="flex flex-row gap-[4px] items-center">
          <Typography variant="Title20px" color="grey700Black">
            {selectedWorkspace.name}
          </Typography>
          {isOpen ? <ChevronUpIcon className="stroke-[#2F323C]" /> : <ChevronDownIcon className="stroke-[#2F323C]" />}
        </button>
      </div>
      <TopSelect workspaceList={workspaceList} isOpen={isOpen} onClick={handleClick} />
      {isTodoList && (
        <div className="lg:hidden">
          <ToDoAddButton />
        </div>
      )}
    </header>
  );
};

export default SelectHeader;
