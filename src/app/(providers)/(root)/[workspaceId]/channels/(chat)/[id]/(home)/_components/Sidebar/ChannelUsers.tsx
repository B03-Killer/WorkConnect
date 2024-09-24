'use client';

import Typography from '@/components/Typography';
import { ChevronDownIcon, UserIcon } from '@/icons';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { useGetQueryDataUsersInChannel } from '../../../../_hook/useChatQuery';

const ChannelUsers = () => {
  const { id } = useParams();
  const workspaceId = useWorkspaceId();
  const workspaceUserId = useWorkspaceUserId();
  const usersInChannel = useGetQueryDataUsersInChannel(Number(id));
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const members = usersInChannel || {};
  const sortedMembers = Object.values(members).sort((a, _) => (a.workspace_user_id === workspaceUserId ? -1 : 1));

  return (
    <>
      <button type="button" className="flex items-center gap-3 mt-4" onClick={toggleOpen}>
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
            <Link
              key={user.workspace_user_id}
              href={`/${workspaceId}/profile/${user.workspace_user_id}`}
              className="flex items-center gap-2"
            >
              <Avatar src={user.profile_image ?? ''} size="32px" />
              <Typography
                variant="Subtitle16px"
                color="grey700Black"
                className="overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-1"
              >
                {isMe && (
                  <Typography
                    variant="Body12px"
                    color="grey600"
                    className="rounded-full w-[18px] h-[18px] flex items-center justify-center bg-primary25 flex-shrink-0"
                  >
                    나
                  </Typography>
                )}
                <span className="overflow-hidden whitespace-nowrap text-ellipsis">{user.name}</span>
              </Typography>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ChannelUsers;
