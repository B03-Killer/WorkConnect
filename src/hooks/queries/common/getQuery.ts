import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const getQuery = <TData = unknown, TError = unknown>(queryOptions: UseQueryOptions<TData, TError>) => {
  return useQuery(queryOptions);
};

export default getQuery;
