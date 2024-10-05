'use client';

import Image from 'next/image';
import brokenFileImage from '/public/images/common/broken-file.png';
import type { ChatImageProps } from './types';

const ERROR_IMAGE = brokenFileImage.src;

const ChatImage = ({ src = '', onError: _, alt = '', ...props }: ChatImageProps) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ERROR_IMAGE;
  };

  return (
    <Image
      src={src}
      onError={handleError}
      alt={alt}
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8d25bPQAHlwLTL4BsmgAAAABJRU5ErkJggg=="
      unoptimized
      {...props}
    />
  );
};

export default ChatImage;
