import { NextRequest, NextResponse } from 'next/server';
import {
  CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_FAILED,
  CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_INVALID_REQUEST,
  CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_SUCCESS
} from './constants';
import { updateChannelActiveAt } from '@/services/channel';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Channel update read at PUT 요청 핸들러
 * @description 채널 아이디를 받아서 채널에 접속한 시간을 기록 합니다.
 */
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const workspaceUserId = getServerCookie('workspaceUserId');

  if (!workspaceUserId) {
    return NextResponse.json(CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { error } = await updateChannelActiveAt({ channelId: Number(id), workspaceUserId });

    if (error) {
      return NextResponse.json(Object.assign(CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_FAILED, { error }), {
        status: 500
      });
    }

    return NextResponse.json(CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_SUCCESS);
  } catch (error) {
    return NextResponse.json(CHANNEL_UPDATE_ACTIVE_AT_RESPONSE_FAILED, { status: 500 });
  }
};
