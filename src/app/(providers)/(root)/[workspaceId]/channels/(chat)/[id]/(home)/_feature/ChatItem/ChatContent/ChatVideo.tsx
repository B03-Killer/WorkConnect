'use client';

import { useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import clsx from 'clsx';
import ChatImage from './ChatImage';
import type { ChatVideoProps } from './types';

const ERROR_IMAGE = brokenFileImage.src;

const ChatVideo = ({ src = '', className, width, height, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

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

export default ChatVideo;
