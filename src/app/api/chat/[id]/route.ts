import { createChatMessage, deleteChatMessage, getChatMessages } from '@/services/chat';
import { NextRequest, NextResponse } from 'next/server';
import {
  CHAT_RESPONSE_DELETE_FAILED,
  CHAT_RESPONSE_DELETE_SUCCESS,
  CHAT_RESPONSE_GET_FAILED,
  CHAT_RESPONSE_POST_FAILED,
  CHAT_RESPONSE_POST_INVALID_REQUEST,
  CHAT_RESPONSE_POST_SUCCESS,
  CHAT_RESPONSE_SUCCESS
} from './constants';
import { getServerCookie } from '@/utils/cookie/serverUtils';

/**
 * Chat[id] GET 요청 핸들러
 * @description params.id 주소를 받아서 채팅 메시지를 조회합니다.
 * @throws {Error} - channel_id가 없는 경우
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;

  try {
    const { data, error } = await getChatMessages({ channel_id: Number(channel_id) });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_RESPONSE_GET_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(CHAT_RESPONSE_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(CHAT_RESPONSE_GET_FAILED, { status: 400 });
  }
};

/**
 * Chat[id] POST 요청 핸들러
 * @description params.id 주소를 받아서 채팅 메시지를 생성합니다.
 * @throws {Error} - content, workspace_user_id가 없는 경우
 */
export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id: channel_id } = params;
  const { content, type } = await req.json();

  const workspaceUserId = getServerCookie('workspaceUserId');

  if (!content || !workspaceUserId) {
    return NextResponse.json(CHAT_RESPONSE_POST_INVALID_REQUEST, { status: 400 });
  }

  try {
    const { error } = await createChatMessage({
      channel_id: Number(channel_id),
      content,
      workspace_user_id: workspaceUserId,
      type
    });

    if (error) {
      return NextResponse.json(Object.assign(CHAT_RESPONSE_POST_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(CHAT_RESPONSE_POST_SUCCESS);
  } catch (error) {
    return NextResponse.json(CHAT_RESPONSE_POST_FAILED, { status: 400 });
  }
};

/**
 * Chat[id] DELETE 요청 핸들러
 * @description params.id 주소를 받아서 채팅 메시지를 삭제합니다.
 * @throws {Error} - id가 없는 경우
 */
export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('id');

  try {
    const { error } = await deleteChatMessage(Number(chatId));

    if (error) {
      return NextResponse.json(Object.assign(CHAT_RESPONSE_DELETE_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(CHAT_RESPONSE_DELETE_SUCCESS);
  } catch (error) {
    return NextResponse.json(CHAT_RESPONSE_DELETE_FAILED, { status: 400 });
  }
};
