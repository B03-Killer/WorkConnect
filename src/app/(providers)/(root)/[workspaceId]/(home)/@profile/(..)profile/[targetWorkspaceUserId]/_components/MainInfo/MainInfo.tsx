import Typography from '@/components/Typography';
import AvatarIcon from '@/icons/Avatar.svg';
import { cva } from 'class-variance-authority';
import Image from 'next/image';

interface MainInfoProps {
  profileImg: string | null;
  name: string | null;
}

const MainInfo = ({ profileImg, name }: MainInfoProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className={AvatarVariants({ isImageExist: profileImg ? true : false })}>
        {profileImg ? (
          <Image
            src={profileImg}
            alt="프로필이미지"
            className="object-cover rounded-full"
            fill
            priority
            sizes="140px"
          />
        ) : (
          <AvatarIcon className="w-[84px] h-[84px] bg-[#BDBDBD]" />
        )}
      </div>

      <div className="flex flex-col mt-[18px] mb-[32px] items-center gap-[8px]">
        <Typography variant="Title22px" color="grey700Black">
          {name}
        </Typography>{' '}
        {/*직책 넣기로 했었나요??*/}
        {/* <Typography variant="Subtitle16px" color="grey500">
          Position
        </Typography> */}
      </div>
    </div>
  );
};

export default MainInfo;

const AvatarVariants = cva(
  'mt-[54px] flex items-center justify-center w-[140px] h-[140px] aspect-auto relative rounded-full',
  {
    variants: {
      isImageExist: {
        true: '',
        false: 'bg-[#BDBDBD]'
      }
    },
    defaultVariants: {
      isImageExist: false
    }
  }
);
