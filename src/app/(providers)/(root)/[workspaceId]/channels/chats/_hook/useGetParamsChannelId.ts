'use client';

import { useParams } from 'next/navigation';

const useGetParamsChannelId = () => {
  const { id } = useParams();
  return Number(Array.isArray(id) ? id[0] : id);
};

export default useGetParamsChannelId;
