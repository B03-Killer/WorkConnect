import { User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentRoute } from './getCurrentRoute';
import { redirectRoutes } from '@/constants/redirectRoutes';

const determineRedirectUrl = (workspaceId: string | undefined, baseUrl: string) => {
  if (workspaceId) {
    return new URL(`/${workspaceId}`, baseUrl);
  }

  return new URL('/', baseUrl);
};

export const handleAuthRedirect = async (request: NextRequest, user: User | null) => {
  const { pathname: path } = request.nextUrl;
  const workspaceId = request.cookies.get('workspaceId')?.value;

  const target = getCurrentRoute({ routes: redirectRoutes, path });

  if (user) {
    if (target?.isGuestOnly && workspaceId) {
      return NextResponse.redirect(determineRedirectUrl(workspaceId, request.url));
    }

    if (target?.isWorkspaceUserOnly && !workspaceId) {
      return NextResponse.redirect(determineRedirectUrl(undefined, request.url));
    }
  } else if (target?.isAuthOnly) {
    return NextResponse.redirect(determineRedirectUrl(undefined, request.url));
  }
};
