import { useGetChannelInfo } from '../../../_hook/useChatQuery';
import useGetParamsChannelId from '../../../../(chat)/[id]/(home)/_hooks/useGetParamsChannelId';

export const useFetchChannelInfos = () => {
  const channelId = useGetParamsChannelId();

  const { data, isPending } = useGetChannelInfo({ id: channelId });

  if (isPending) {
    return {
      name: '',
      channel_thumbnail: ''
    };
  }

  return {
    name: data?.name ?? '',
    channel_thumbnail: data?.channel_thumbnail ?? ''
  };
};
