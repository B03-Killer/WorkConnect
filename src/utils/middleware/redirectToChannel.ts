import api from '@/api';
import { NextRequest, NextResponse } from 'next/server';

const shouldRedirectToChannel = (url: string, workspaceId: string | undefined) =>
  workspaceId && url.includes(`/${workspaceId}/channels?redirect=true`);

export async function redirectToChannel(request: NextRequest) {
  const workspaceId = request.cookies.get('workspaceId')?.value;
  const url = request.nextUrl.href;

  if (!shouldRedirectToChannel(url, workspaceId)) return;

  const workspaceUserId = request.cookies.get('workspaceUserId')?.value;

  const channelId = await api.channel.getChannelId({
    workspace_id: Number(workspaceId),
    workspace_user_id: workspaceUserId ?? ''
  });

  if (!channelId) return;

  const redirectUrl = new URL(`/${workspaceId}/channels/${channelId}`, request.url);
  return NextResponse.redirect(redirectUrl);
}
