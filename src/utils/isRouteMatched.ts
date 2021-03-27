import {matchPath} from "react-router";

export type CheckIfSelectedType = (location: { pathname: string }, route: string) => boolean;
export const isRouteMatched: CheckIfSelectedType = (location, route) => !!matchPath(location.pathname, route);