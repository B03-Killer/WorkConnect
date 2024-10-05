export type ProfileProps = {
  src: string | null;
  userName: string;
  href: string;
};
export type TimeProps = { createdAt: string };

export type OtherChatProps = ProfileProps & TimeProps;
export type MeChatProps = { hasRead: boolean } & TimeProps;

export type ChatItemProps = OtherChatProps | MeChatProps; //TODO: 아직 안씀
