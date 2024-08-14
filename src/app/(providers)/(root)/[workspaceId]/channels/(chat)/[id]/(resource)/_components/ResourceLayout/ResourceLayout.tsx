'use client';

import { PageLayout } from '@/components/PageLayout';
import { Tab, Tabs } from '@/components/Tabs';
import { XIcon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ResourceLayout = ({ children }: StrictPropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = pathname.includes('/media') ? 0 : pathname.includes('/file') ? 1 : 2;
  const originPath = pathname.substring(0, pathname.lastIndexOf('/'));

  const handleReplace = (path: string) => {
    router.replace(path);
  };

  return (
    <PageLayout title="파일 내역" showBottomBar={false} TopBarLeftIcon1={<XIcon onClick={() => router.back()} />}>
      <Tabs>
        <Tab as="button" onClick={() => handleReplace(`${originPath}/media`)} active={activeTab === 0}>
          사진&middot;동영상
        </Tab>
        <Tab as="button" onClick={() => handleReplace(`${originPath}/file`)} active={activeTab === 1}>
          파일
        </Tab>
        <Tab as="button" onClick={() => handleReplace(`${originPath}/notice`)} active={activeTab === 2}>
          공지
        </Tab>
      </Tabs>
      {children}
    </PageLayout>
  );
};

export default ResourceLayout;
