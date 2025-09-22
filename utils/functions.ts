import type { IUser } from "../types/user";

export const sortByName = (a: IUser, b: IUser) => {
  if (a.username.toLowerCase() < b.username.toLowerCase()) {
    return -1;
  }
  if (a.username.toLowerCase() > b.username.toLowerCase()) {
    return 1;
  }
  return 0;
};

export function getNowYear() {
  return new Date().getFullYear();
}
