import { QueryClient, useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const useGetQuery = <TData = unknown, TError = unknown>(queryOptions: UseQueryOptions<TData, TError>) => {
  return useQuery(queryOptions);
};

export const getPrefetchQuery = async <TData = unknown, TError = unknown>(
  queryOptions: UseQueryOptions<TData, TError>
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryOptions);
};
