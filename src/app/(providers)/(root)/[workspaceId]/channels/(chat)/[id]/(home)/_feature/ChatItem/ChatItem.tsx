import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import { StrictPropsWithChildren } from '@/types/common';
import { formatDate } from '@/utils/time';
import clsx from 'clsx';
import Link from 'next/link';
import type { ProfileProps, TimeProps } from './types';

const Wrapper = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={clsx('flex items-end gap-2 justify-end', className)}>{children}</div>;
};

//TODO: href 왜 없지?
const Profile = ({ href, src, userName }: ProfileProps) => {
  return (
    <div className="inline-flex items-center gap-2 w-full">
      <Link href={href || '/'}>
        <Avatar src={src ?? undefined} size="32px" />
      </Link>
      <Typography variant="Title16px" color="grey900">
        {userName}
      </Typography>
    </div>
  );
};

const Utility = ({ children }: StrictPropsWithChildren) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const Time = ({ createdAt }: TimeProps) => {
  return <span className="text-grey300 text-[10px] leading-[130%]">{formatDate(createdAt, 'A h:mm').toKor()}</span>;
};

const ReadBadge = () => {
  return (
    <Typography variant="Body12px" color="primary700" className="opacity-60 text-right">
      읽음
    </Typography>
  );
};

export const ChatItem = {
  Wrapper,
  Profile,
  Utility,
  Time,
  ReadBadge
};
