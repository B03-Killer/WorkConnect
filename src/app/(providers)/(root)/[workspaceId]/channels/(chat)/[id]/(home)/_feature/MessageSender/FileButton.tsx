'use client';

import { StrictPropsWithChildren } from '@/types/common';
import { ComponentPropsWithoutRef, useRef } from 'react';
import Typography from '@/components/Typography';
import FileInput from '@/components/FileInput';

export type FileButtonProps = {
  title: string;
  name: string;
  accept: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<ComponentPropsWithoutRef<'button'>, 'onChange'>;

const FileButton = ({
  children,
  title,
  name,
  accept,
  handleChange,
  ...props
}: StrictPropsWithChildren<FileButtonProps>) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <>
      <FileInput name={name} accept={accept} ref={ref} handleChange={handleChange} />
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-[6px] px-[5px]"
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#74B974] lg:w-auto lg:h-auto lg:bg-transparent">
          {children}
        </div>
        <Typography as="span" variant="Body12px" className="text-grey500 lg:hidden">
          {title}
        </Typography>
      </button>
    </>
  );
};

export default FileButton;
