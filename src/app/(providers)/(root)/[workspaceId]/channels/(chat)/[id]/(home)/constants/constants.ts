export const QUERY_KEYS = {
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id] as const,
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id] as const,
  CHANNEL_INFO: (id: number) => ['channelInfo', id] as const,
  LATEST_NOTICE: (id: number) => ['latestNotice', id] as const,
  CHANNEL_DOCUMENTS: (id: number) => ['channelDocuments', id] as const,
  CHANNEL_MEDIA: (id: number) => ['channelMedia', id] as const,
  CHANNEL_NOTICES: (id: number) => ['channelNotices', id] as const
};

export const STORAGE_BUCKET_NAME = {
  imageFile: 'photos',
  videoFile: 'videos',
  documentFile: 'documents'
} as const;
