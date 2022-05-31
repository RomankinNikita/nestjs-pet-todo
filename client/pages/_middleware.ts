import { NextResponse, NextMiddleware } from "next/server";
import { APP_PATHS, baseNestServerURL, COOKIE_NAME, NEST_API_PATHS, PRIVATE_PATHS, REQUIRED_ROLES_BY_PATH, UNAVAILABLE_WHEN_SIGNED_IN_PATHS } from "../utils/constants";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";
import { isRouteAvailable } from "../utils/isRouteAvailable";
import { Role, Roles } from '../utils/types';

const middleware: NextMiddleware = async (req) => {
  const { cookies, url } = req;
  const Url = new URL(url);
  const jwt = cookies[COOKIE_NAME];

  if (UNAVAILABLE_WHEN_SIGNED_IN_PATHS.some((path) => Url.pathname.includes(path))) {
    if (jwt) {
      try {      
        await fetchVerify(jwt);
        Url.pathname = APP_PATHS.main;
        return NextResponse.redirect(Url);
      } catch (error) {      
        return NextResponse.next();
      }
    }
  }

  if (PRIVATE_PATHS.some((path) => Url.pathname.includes(path))) {
    if (!jwt) {
      Url.pathname = APP_PATHS.signIn;
      return NextResponse.redirect(Url);
    }

    try {
      const userRolesResponse = await fetchVerify(jwt);
      const userRoles = await userRolesResponse.json() as Role[];
      const rolesToList = userRoles.map(({ value }) => value);
      if (
        isRouteAvailable(rolesToList as Roles[], REQUIRED_ROLES_BY_PATH[Url.pathname as APP_PATHS])
        ) {
          return NextResponse.next();
        } else {
          Url.pathname = APP_PATHS.forbidden;
          return NextResponse.redirect(Url);
        }
    } catch (error) {      
      Url.pathname = APP_PATHS.signIn;
      return NextResponse.redirect(Url);
    }
  } else {
    return NextResponse.next();
  }
}

async function fetchVerify(token: string): Promise<Response> {
  return fetch(`${baseNestServerURL}/${NEST_API_PATHS.verify}`, {
    method: 'GET',
    headers: 
      {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        ...getAuthorizationHeader(token),
      },
      mode: 'cors',
      credentials: 'same-origin',
      referrerPolicy: 'no-referrer'
  });
}

export default middleware;