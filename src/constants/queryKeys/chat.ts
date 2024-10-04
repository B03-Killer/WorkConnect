export const CHAT_QUERY_KEYS = {
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id] as const,
  LATEST_NOTICE: (id: number) => ['latestNotice', id] as const
};
