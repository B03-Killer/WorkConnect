export const CHANNEL_QUERY_KEYS = {
  CHANNEL_INFO: (id: number) => ['channelInfo', id] as const,
  CHANNEL_DOCUMENTS: (id: number) => ['channelDocuments', id] as const,
  CHANNEL_MEDIA: (id: number) => ['channelMedia', id] as const,
  CHANNEL_NOTICES: (id: number) => ['channelNotices', id] as const,
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id] as const
};
