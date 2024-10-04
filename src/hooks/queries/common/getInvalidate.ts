import { useQueryClient } from '@tanstack/react-query';

export const getInvalidate = (QUERY_OPTIONS: any) => {
  const queryClient = useQueryClient();

  return Object.fromEntries(
    Object.keys(QUERY_OPTIONS).map((key) => [
      key,
      (arg: number) => queryClient.invalidateQueries(QUERY_OPTIONS[key as keyof typeof QUERY_OPTIONS](arg))
    ])
  );
};
