'use client';

import { useParams } from 'next/navigation';
import { CHAT_TYPE } from '@/constants/chat';
import { useGetChannelMedia } from '../../../_hook/useChatQuery';
import { ChatImage, ChatVideo } from '@/components/Chats/components';

const MediaListPage = () => {
  const { id } = useParams();
  const { data: media = [] } = useGetChannelMedia(Number(id));

  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-3 py-[22px] px-4 lg:grid-cols-4">
      {media.map((media) => {
        if (!media.content) return null;

        return (
          <li key={media.id} className="w-full h-full aspect-square">
            {media.type === CHAT_TYPE.video ? (
              <ChatVideo src={media.content} width={100} height={100} className="w-full h-full object-cover" controls />
            ) : (
              <ChatImage src={media.content} width={100} height={100} alt="" className="w-full h-full object-cover" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MediaListPage;
