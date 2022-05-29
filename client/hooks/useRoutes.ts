import { intersection } from 'lodash';
import { useMemo } from 'react';
import { useUserContext } from '../contexts/user';
import { APP_PATHS } from '../utils/constants';
import { Roles } from '../utils/types';
import { Icon, List, Dashboard, Man } from 'tabler-icons-react';

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
        isAvailable: isRouteAvailable(userRoles, [Roles.ADMIN]),
        icon: Man,
      },
      {
        id: 2,
        href: APP_PATHS.todos,
        label: 'Todo List',
        isAvailable: isRouteAvailable(userRoles, [Roles.USER]),
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

function isRouteAvailable(userRoles: Roles[], requiredRoles: Roles[]): boolean {
  const intersections = intersection(userRoles, requiredRoles);
  return !!intersections.length;
}
