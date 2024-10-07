import { GetUsersInChannelResponse } from '@/types/channel';
import dayjs from 'dayjs';

type GetLastActiveAtProps = {
  usersInChannel: GetUsersInChannelResponse;
  workspaceUserId: string;
};

/** 채널에서 마지막 활성화 시간을 가져온다. */
export const getChannelLastActiveTime = ({ usersInChannel, workspaceUserId }: GetLastActiveAtProps) => {
  const remainingUsers = Object.values(usersInChannel).filter((user) => user.workspace_user_id !== workspaceUserId);
  return remainingUsers.length === 1 ? dayjs(remainingUsers[0].last_active_at) : null;
};
