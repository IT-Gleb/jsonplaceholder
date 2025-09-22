import { useAsyncData } from "nuxt/app";
import type { TUserData } from "../types/user";
import { type Ref } from "vue";

export const useUserData = (paramUserId: Ref<string | number>) => {
  const url = `/api/userdata`;
  const {
    status,
    data: userdata,
    error,
    clear,
    execute,
    refresh,
  } = useAsyncData(
    `userdata-${paramUserId.value}`,
    async () =>
      await $fetch<TUserData>(url, {
        headers: { "content-type": "application/json; charset=utf-8" },
        method: "GET",
        signal: AbortSignal.timeout(5000),
        cache: "force-cache",
        params: {
          userId: paramUserId.value,
        },
      }),
    {
      immediate: false,
      dedupe: "cancel",
      lazy: true,
      watch: [paramUserId],
    }
  );

  return { status, userdata, error, clear, execute, refresh };
};
