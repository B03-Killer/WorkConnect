import api from '@/api';
import type { GetExistingChannelIdRequestProps } from '@/types/channel';

export const getExistingChannelId = async ({
  workspace_user_id,
  other_workspace_user_id
}: GetExistingChannelIdRequestProps) => {
  const response = await api.channel.getExistingChannelId({
    workspace_user_id,
    other_workspace_user_id
  });

  return response;
};
