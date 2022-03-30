import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export async function getUnsplashPhotos() {
  const unsplashResponse = await unsplash.search.getPhotos({
    query: "coffee shops",
    perPage: 40,
    orientation: "landscape",
  });

  const unsplashResults = unsplashResponse.response.results;
  const photos = unsplashResults.map((result) => result.urls["thumb"]);
  return photos;
}

export { unsplash };
