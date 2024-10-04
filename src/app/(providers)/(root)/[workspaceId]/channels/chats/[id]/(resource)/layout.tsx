import type { StrictPropsWithChildren } from '@/types/common';
import ResourceLayout from './_components/ResourceLayout';

const ResourcePageLayout = ({ children }: StrictPropsWithChildren) => {
  return <ResourceLayout>{children}</ResourceLayout>;
};

export default ResourcePageLayout;
