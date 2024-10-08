import { type QueryFunction, type QueryKey, queryOptions, UseQueryOptions } from '@tanstack/react-query';

type CreateQueryOptions<T> = {
  key: QueryKey;
  fn: QueryFunction<T>;
  initialData?: any;
} & Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;

export const createQueryOptions = <T>({ key, fn, ...props }: CreateQueryOptions<T>) => {
  return queryOptions({
    queryKey: key,
    queryFn: fn,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...props
  });
};
