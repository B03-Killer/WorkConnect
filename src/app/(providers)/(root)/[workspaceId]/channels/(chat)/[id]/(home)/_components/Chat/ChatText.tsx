import Typography from '@/components/Typography';
import { ComponentProps } from 'react';
import clsx from 'clsx';

type ChatTextProps = ComponentProps<'div'> & { className?: string };

const ChatText = ({ children, className, ...props }: ChatTextProps) => {
  return (
    <Typography
      variant="Body14px"
      className={clsx(
        `max-w-[280px] px-3 py-2 rounded-[20px] whitespace-pre-wrap break-words selection:bg-transparent break-keep`,
        className
      )}
      {...props}
      color="grey700Black"
    >
      {children}
    </Typography>
  );
};

export default ChatText;
