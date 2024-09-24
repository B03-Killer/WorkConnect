import clsx from 'clsx';
import Typography from '@/components/Typography';
import ChannelUsers from './ChannelUsers';
import ChannelMenu from './ChannelMenu';

type SidebarProps = {
  isOpenSidebar: boolean;
  handleOpenSidebar: () => void;
  channelName: string;
};

const Sidebar = ({ isOpenSidebar, handleOpenSidebar, channelName }: SidebarProps) => {
  return (
    <>
      <aside
        className={clsx(
          'transition-transform duration-300 will-change-transform bg-white fixed top-0 right-0 h-dvh z-50 w-[300px] border-l border-transparent px-4 lg:w-[370px] lg:top-[84px] lg:border-grey50',
          isOpenSidebar ? '-translate-x-0' : 'translate-x-[100%]'
        )}
      >
        <div className="flex flex-col">
          <ChannelName channelName={channelName} />
          <ChannelUsers />
          <ChannelMenu />
        </div>
      </aside>
      <div
        className={`w-full h-full bg-[#333] z-40 fixed top-0 left-0 transition-opacity duration-300 ${isOpenSidebar ? 'opacity-70' : 'opacity-0 pointer-events-none'} lg:opacity-0`}
        onClick={handleOpenSidebar}
      />
    </>
  );
};

const ChannelName = ({ channelName }: { channelName: string }) => {
  return (
    <Typography
      variant="Title20px"
      color="grey700Black"
      as="strong"
      className="py-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis"
    >
      {channelName}
    </Typography>
  );
};

export default Sidebar;
