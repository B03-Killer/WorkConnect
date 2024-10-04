import { type QueryFunction, type QueryKey, queryOptions } from '@tanstack/react-query';

type CreateQueryOptions<T> = {
  key: QueryKey;
  fn: QueryFunction<T>;
  selectFn?: (data: T) => any;
};

export const createQueryOptions = <T>({ key, fn, selectFn }: CreateQueryOptions<T>) => {
  return queryOptions<T>({
    queryKey: key,
    queryFn: fn,
    refetchOnWindowFocus: false,
    staleTime: 0,
    ...(selectFn && { select: selectFn })
  });
};
