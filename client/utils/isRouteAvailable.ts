import { intersection } from "lodash";
import { Roles } from "./types";

export function isRouteAvailable(userRoles: Roles[], requiredRoles: Roles[] | undefined): boolean {
  if (!requiredRoles) return false;
  const intersections = intersection(userRoles, requiredRoles);
  return !!intersections.length;
}