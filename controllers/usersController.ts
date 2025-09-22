import { useAsyncData } from "nuxt/app";
import { type IUser } from "../types/user";
import { sortByName } from "../utils/functions";

type IUsersRoot = {
  users: IUser[];
};

export const useUsers = () => {
  const { status, data, clear, error, execute, refresh } = useAsyncData(
    "allUsers",
    async () =>
      await $fetch<IUsersRoot, string>("/api/users", {
        headers: { "content-type": "application/json; charset=utf-8" },
        method: "GET",
        signal: AbortSignal.timeout(3000),
        cache: "force-cache",
      }),
    {
      immediate: false,
      lazy: true,
      dedupe: "cancel",
      transform: (input) => {
        input.users = input.users.sort(sortByName);
        return input;
      },
    }
  );

  return { status, data, error, execute, clear, refresh };
};
