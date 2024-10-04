import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import Link from 'next/link';

type ChatUserCardProps = {
  href: string;
  src: string;
  isMe: boolean;
  name: string;
};

const ChatUserCard = ({ href, src, isMe, name }: ChatUserCardProps) => {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Avatar src={src} size="32px" />
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
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{name}</span>
      </Typography>
    </Link>
  );
};

export default ChatUserCard;
