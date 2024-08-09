'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import ImageIcon from '@/icons/image.svg';
import PaperclipIcon from '@/icons/paperclip.svg';
import UserIcon from '@/icons/User.svg';
import HashIcon from '@/icons/Hash.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import Typography from '@/components/Typography';

type SidebarProps = {
  isOpenSidebar: boolean;
  handleOpenSidebar: () => void;
  channelName: string;
};

const Sidebar = ({ isOpenSidebar, handleOpenSidebar, channelName }: SidebarProps) => {
  const workspaceId = useWorkspaceId();
  const { id } = useParams();

  const menuItems = useMemo(() => {
    return [
      {
        href: `/${workspaceId}/chat/${id}/media`,
        icon: ImageIcon,
        label: '사진·동영상',
        svgType: 'stroke'
      },
      {
        href: `/${workspaceId}/chat/${id}/file`,
        icon: PaperclipIcon,
        label: '파일',
        svgType: 'fill'
      },
      {
        href: `/${workspaceId}/chat/${id}/notice`,
        icon: HashIcon,
        label: '공지',
        svgType: 'fill'
      }
    ];
  }, [workspaceId, id]);

  return (
    <>
      <aside
        className={clsx(
          'transition-transform duration-300 will-change-transform bg-white fixed top-0 right-0 h-dvh z-50 w-[300px] px-4',
          isOpenSidebar ? '-translate-x-0' : 'translate-x-[100%]'
        )}
      >
        <div className="flex flex-col">
          <Typography variant="Title20px" color="grey700Black" as="strong" className="py-[14px]">
            {channelName}
          </Typography>
          <div className="flex items-center gap-2 mt-4">
            <UserIcon className="text-grey700Black stroke-current" />
            <Typography variant="Subtitle16px" color="grey700Black" as="button">
              대화멤버
            </Typography>
          </div>
          <ul className="flex flex-col gap-8 mt-8 pt-8 border-t border-grey50">
            {menuItems.map(({ href, icon: Icon, label, svgType }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3">
                  <Icon className={clsx('text-grey700Black', svgType === 'fill' ? 'fill-current' : 'stroke-current')} />
                  <Typography variant="Subtitle16px" color="grey700Black" as="span" className="flex-1">
                    {label}
                  </Typography>
                  <ChevronRightIcon className="text-grey300 stroke-current" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div
        className={`w-full h-full bg-[#333] z-40 fixed top-0 left-0 transition-opacity duration-300 ${isOpenSidebar ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
        onClick={handleOpenSidebar}
      />
    </>
  );
};

export default Sidebar;
