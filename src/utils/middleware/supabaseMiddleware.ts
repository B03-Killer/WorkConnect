import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { handleAuthRedirect } from './handleAuthRedirect';

export async function updateSession(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          responseWithUpdatedCookies(cookiesToSet, request);
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const authRedirectResponse = await handleAuthRedirect(request, user);

  if (authRedirectResponse) {
    return authRedirectResponse;
  }

  return NextResponse.next({ request });
}

const responseWithUpdatedCookies = (
  cookiesToSet: Array<{ name: string; value: string; options?: any }>,
  request: NextRequest
) => {
  const response = NextResponse.next({ request });
  cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
};
