'use client';

import Typography from '@/components/Typography';
import { ChevronDownIcon, UserIcon } from '@/icons';
import { useState } from 'react';
import clsx from 'clsx';
import ChatUserCard from './ChatUserCard';
import type { ChannelUsersTypes } from '../../../_sections/ChatSectionWrapper';

type ChannelUsersProps = {} & ChannelUsersTypes;

const ChannelUsers = ({ sortedMembers, workspaceUserId, workspaceId }: ChannelUsersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button type="button" className="flex items-center gap-3 mt-4" onClick={handleToggleOpen}>
        <UserIcon className="text-grey700Black stroke-current" />
        <Typography variant="Subtitle16px" color="grey700Black" className="flex items-center gap-2 flex-1">
          <span className="flex-1 text-left">대화멤버</span> <ChevronDownIcon className="stroke-grey700Black" />
        </Typography>
      </button>
      <div
        className={clsx(
          'flex flex-col gap-3 mt-4 transition-all duration-300 overflow-hidden px-2',
          isOpen ? '' : 'hidden'
        )}
      >
        {sortedMembers.map((user) => {
          const isMe = user.workspace_user_id === workspaceUserId;

          return (
            <ChatUserCard
              key={user.workspace_user_id}
              isMe={isMe}
              href={`/${workspaceId}/profile/${user.workspace_user_id}`}
              src={user.profile_image ?? ''}
              name={user.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChannelUsers;
