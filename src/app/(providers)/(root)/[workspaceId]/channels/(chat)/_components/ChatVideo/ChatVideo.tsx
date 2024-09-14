import { type ComponentProps, memo, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import ChatImage from '../ChatImage';
import clsx from 'clsx';

const ERROR_IMAGE = brokenFileImage.src;

type VideoTypes = Omit<ComponentProps<'video'>, 'width' | 'height'>;
type ImageTypes = Omit<ComponentProps<'img'>, 'width' | 'height'>;

type ChatVideoProps = {
  width?: number;
  height?: number;
} & VideoTypes &
  ImageTypes;

const ChatVideo = ({ src = '', className, width, height, ref, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

  /**
   * 이 자체로도 좋지만, 썸네일을 넣어주는 것도 좋을 것 같습니다.
   */
  if (!src) return null;
  if (hasError) {
    return (
      <ChatImage
        src={ERROR_IMAGE}
        alt="error"
        width={width || 200}
        height={height || 200}
        className={clsx('h-auto', className)}
        {...props}
      />
    );
  }

  return (
    <video
      src={src}
      className={className}
      onError={() => setHasError(true)}
      preload="metadata"
      playsInline
      width={width}
      height={height}
      controls
      {...props}
    />
  );
};

const MemoChatVideo = memo(ChatVideo, (prevProps, nextProps) => {
  return prevProps.src === nextProps.src;
});

export default MemoChatVideo;
