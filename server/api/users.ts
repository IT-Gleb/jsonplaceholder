import { type IUser } from "../../types/user";

export default defineEventHandler(async (event) => {
  const url: string = "https://jsonplaceholder.typicode.com/users";
  try {
    const res = await $fetch<IUser[], string>(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "content-type": "application/json; charset=utf-8" },
      cache: "no-store",
      retry: 2,
      retryDelay: 500,
    });
    // console.log(res);
    return { users: res };
  } catch (err: unknown) {
    console.log((err as Error).message);
    return { error: "no Data" };
  }
});
