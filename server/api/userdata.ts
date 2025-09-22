import type {
  TArrayTodos,
  TArrayAlbums,
  TUserData,
  IAlbomImage,
  TArrayAlbomImage,
  TArrayPhotos,
} from "~~/types/user";

function fetcher<T>(url: string) {
  return $fetch<T>(url, {
    headers: { "content-type": "application/json; charset=utf-8" },
    method: "GET",
    signal: AbortSignal.timeout(10000),
    retry: 2,
    retryDelay: 1000,
    cache: "no-store",
  });
}

export default defineEventHandler(async (event) => {
  if (event.method === "GET") {
    const url = new URL(event.path, "http://localhost:3005");
    const userId = url.searchParams.get("userId") ?? "2";

    const urls = [
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    ];

    let requests = urls.map((item, index) => {
      switch (index) {
        case 0:
          return fetcher<TArrayTodos>(item);
        case 1:
          return fetcher<TArrayAlbums>(item);
      }
    });

    //console.log(requests);

    const data: TUserData = {
      userId,
      userdata: { todos: [], albums: [], images: [] },
    };

    //Получить данные пользователя
    await Promise.allSettled(requests)
      .then((result) => {
        result.forEach((item, num) => {
          if (item.status === "fulfilled") {
            switch (num) {
              case 0:
                //console.log(num, item.value);
                data.userdata.todos = item.value as unknown as never[];
                break;
              case 1:
                //console.log(num, item.value);
                data.userdata.albums = item.value as unknown as never[];
                break;
            }
          }
        });
      })
      .catch((err) => {
        console.log((err as Error).message);
        data["userId"] = userId;
        data["userdata"] = {
          albums: [],
          todos: [],
          images: [],
        };
        return data;
      });

    //Получить все фото для альбомов пользователя
    //Сформировать урл
    const photoUrl = data.userdata.albums.map(
      (item) => `https://jsonplaceholder.typicode.com/albums/${item.id}/photos`
    );
    //console.log(photoUrl);

    //Сформировать массив fetchers
    const requests2 = photoUrl.map((item) => fetcher<TArrayAlbomImage>(item));
    await Promise.allSettled(requests2)
      .then((results) => {
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            //console.log("fullfilled");
            data.userdata.images.push(
              result.value as unknown as TArrayAlbomImage
            );
          }
        });
      })
      .catch((err: unknown) => {
        data.userdata.images = [];
        console.log((err as Error).message);
      });

    return data satisfies TUserData;
  }
  return { error: "no Data" };
});
