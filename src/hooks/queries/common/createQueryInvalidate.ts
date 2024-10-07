import { QueryKey, useQueryClient } from '@tanstack/react-query';

export const createQueryInvalidate = (queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  return queryClient.invalidateQueries({ queryKey: queryKey });
};
