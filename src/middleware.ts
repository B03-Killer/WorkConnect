import { type NextRequest } from 'next/server';
import { updateSession } from './utils/middleware/supabaseMiddleware';
import { redirectToChannel } from './utils/middleware/redirectToChannel';

async function handleSessionUpdate(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Error updating session:', error);
    return new Response('Error updating session', { status: 500 });
  }
}

async function handleChannelRedirect(request: NextRequest) {
  try {
    const redirectResponse = await redirectToChannel(request);

    if (redirectResponse) {
      return redirectResponse;
    }
  } catch (error) {
    console.error('Error redirecting to channel:', error);
    return new Response('Error redirecting to channel', { status: 500 });
  }
}

export async function middleware(request: NextRequest) {
  const sessionUpdateResponse = await handleSessionUpdate(request);
  const channelRedirectResponse = await handleChannelRedirect(request);
  return channelRedirectResponse || sessionUpdateResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|/).*)'
  ]
};
