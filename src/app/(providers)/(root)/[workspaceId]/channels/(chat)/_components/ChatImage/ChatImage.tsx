import Image from 'next/image';
import brokenFileImage from '/public/images/common/broken-file.png';
import { StrictNextImagePropsType } from '@/types/common';
import { memo } from 'react';

const ERROR_IMAGE = brokenFileImage.src;

type ChatImageProps = Omit<StrictNextImagePropsType, 'alt'> & { alt?: string };

/**
 * TODO: 컴포넌트가 상위 다른 디렉토리에서도 사용이 된다면, 더 상위로 올려주세요.
 * 이 경우에는 [workspaceId]로 주시거나 차라리 /components/images 등으로 옮기는것도 좋을 것 같습니다.
 */
const ChatImage = ({ src = '', className, onError, alt = '', ...props }: ChatImageProps) => {
  if (!src) return null;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== ERROR_IMAGE) {
      e.currentTarget.src = ERROR_IMAGE;
    }
  };

  return (
    <Image
      src={src || ERROR_IMAGE}
      className={className}
      onError={handleError}
      alt={alt}
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8d25bPQAHlwLTL4BsmgAAAABJRU5ErkJggg=="
      unoptimized
      {...props}
    />
  );
};

/**
 * TODO: 해당 메모이제이션을 넣은 이유는 적용전 어떤 문제가 있었기 때문인가요?
 */
const MemoChatImage = memo(ChatImage, (prevProps, nextProps) => {
  return prevProps.src === nextProps.src;
});

export default MemoChatImage;
