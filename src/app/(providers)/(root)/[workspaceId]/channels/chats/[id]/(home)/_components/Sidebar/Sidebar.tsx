import clsx from 'clsx';
import Typography from '@/components/Typography';
import ChannelUsers from './components/ChannelUsers';
import ChannelMenu from './components/ChannelMenu';
import { ChannelUsersTypes } from '../../_sections/ChatSectionWrapper';

type SidebarProps = {
  isOpenSidebar: boolean;
  channelName: string;
  channelUsersProps: ChannelUsersTypes;
  pathname: string;
};

const Sidebar = ({ isOpenSidebar, channelName, channelUsersProps, pathname }: SidebarProps) => {
  return (
    <aside
      className={clsx(
        'transition-transform duration-300 will-change-transform bg-white fixed top-0 right-0 h-dvh z-50 w-[300px] border-l border-transparent px-4 lg:w-[370px] lg:top-[84px] lg:border-grey50',
        isOpenSidebar ? '-translate-x-0' : 'translate-x-[100%]'
      )}
    >
      <div className="flex flex-col">
        <Typography
          variant="Title20px"
          color="grey700Black"
          as="strong"
          className="py-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis"
        >
          {channelName}
        </Typography>
        <ChannelUsers {...channelUsersProps} />
        <ChannelMenu pathname={pathname} />
      </div>
    </aside>
  );
};

export default Sidebar;
