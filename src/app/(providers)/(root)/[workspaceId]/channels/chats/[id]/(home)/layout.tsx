import { BottomBar, PageLayout } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';

const DetailLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout>
      {children}
      <BottomBar className="hidden lg:block" />
    </PageLayout>
  );
};

export default DetailLayout;
