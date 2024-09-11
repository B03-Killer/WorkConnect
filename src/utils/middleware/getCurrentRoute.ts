import { RedirectRoutesProps } from '@/constants/redirectRoutes';

const isExactMatch = (routePath: string, path: string) => routePath === path;

const isRegexMatch = (routePath: string, path: string) => {
  const regex = new RegExp(routePath);
  return regex.test(path);
};

const isPrefixMatch = (routePath: string, path: string) => path.startsWith(routePath);

export const getCurrentRoute = ({ routes, path }: { routes: RedirectRoutesProps[]; path: string }) => {
  return routes.find((route) => {
    if (route.exact) {
      return isExactMatch(route.path, path);
    }

    if (route.regex) {
      return isRegexMatch(route.path, path);
    }

    return isPrefixMatch(route.path, path);
  });
};
