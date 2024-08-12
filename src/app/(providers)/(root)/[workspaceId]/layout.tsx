'use client';
import { PageLayout } from '@/components/PageLayout';
import SelectHeader from '@/components/SelectHeader';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { StrictPropsWithChildren } from '@/types/common';
import { usePathname } from 'next/navigation';

interface HomeParallelLayoutProps {
  profile: React.ReactNode;
}

const HomeParallelLayout = ({ children, profile }: StrictPropsWithChildren<HomeParallelLayoutProps>) => {
  const workspaceId = useWorkspaceId();
  const paths = usePathname().split('/');

  //프로필 페이지 이외의 헤더
  if (paths.length > 2 && paths[2] !== 'profile')
    return (
      <>
        <PageLayout title="" showTopBar={false}>
          <div className="">{children}</div>
        </PageLayout>
      </>
    );

  //프로필 페이지 헤더
  if (paths.length > 2 && paths[2] === 'profile')
    return (
      <>
        <PageLayout title="" showTopBar={false}>
          <SelectHeader workspaceId={workspaceId} isFull isHidden={paths[2] === 'profile'} />
          <div className="flex lg:flex-row">
            <div className="hidden lg:flex">{children}</div>
            <div className="w-full lg:min-w-[374px] lg:max-w-[374px]"></div>
            <div className="w-full fixed lg:min-w-[374px] lg:max-w-[374px] lg:w-[374px] lg:top-[84px] lg:right-0">
              {profile}
            </div>
          </div>
        </PageLayout>
      </>
    );

  //홈 페이지 헤더
  return (
    <>
      <PageLayout title="" showTopBar={false}>
        <SelectHeader workspaceId={workspaceId} isFull isHidden={paths[2] === 'profile'} />
        <div className="hidden lg:flex">{children}</div>
      </PageLayout>
    </>
  );
};

export default HomeParallelLayout;
