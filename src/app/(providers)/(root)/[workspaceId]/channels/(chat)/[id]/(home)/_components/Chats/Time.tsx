import { StrictPropsWithChildren } from '@/types/common';

const Time = ({ children }: StrictPropsWithChildren) => {
  return <span className="text-grey300 text-[10px] leading-[130%]">{children}</span>;
};
export default Time;
