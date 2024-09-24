import Avatar from '@/components/Avatar';
import Typography from '@/components/Typography';
import Link from 'next/link';
import { memo } from 'react';

type OtherProfileProps = {
  profileImage: string | null;
  name: string;
  profileUrl: string;
};

const OtherProfile = memo(({ profileImage, name, profileUrl }: OtherProfileProps) => {
  return (
    <div className="inline-flex items-center gap-2 w-full">
      <Link href={profileUrl}>
        <Avatar src={profileImage ?? undefined} size="32px" />
      </Link>
      <Typography variant="Title16px" color="grey900">
        {name}
      </Typography>
    </div>
  );
});

export default OtherProfile;
