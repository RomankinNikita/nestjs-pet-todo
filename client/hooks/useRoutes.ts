import { useMemo } from 'react';
import { useUserContext } from '../contexts/user';
import { APP_PATHS, REQUIRED_ROLES_BY_PATH } from '../utils/constants';
import { Icon, List, Dashboard, Man } from 'tabler-icons-react';
import { isRouteAvailable } from '../utils/isRouteAvailable';

type Route = {
  id: number;
  href: APP_PATHS;
  label: string;
  isAvailable: boolean;
  icon?: Icon;
};

export const useRoutes = (): Route[] => {
  const [user] = useUserContext();

  const routes = useMemo<Route[]>(() => {
    const userRoles = user?.roles ?? [];

    return [
      {
        id: 1,
        href: APP_PATHS.admin,
        label: 'Admin',
        isAvailable: isRouteAvailable(userRoles, REQUIRED_ROLES_BY_PATH[APP_PATHS.admin]),
        icon: Man,
      },
      {
        id: 2,
        href: APP_PATHS.todos,
        label: 'Todo List',
        isAvailable: isRouteAvailable(userRoles, REQUIRED_ROLES_BY_PATH[APP_PATHS.todos]),
        icon: List,
      },
      {
        id: 3,
        href: APP_PATHS.animation,
        label: 'Animations',
        isAvailable: true,
        icon: Dashboard,
      },
    ].filter(({ isAvailable }) => isAvailable);
  }, [user?.roles]);
  return routes;
};
