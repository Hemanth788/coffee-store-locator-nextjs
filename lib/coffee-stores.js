import { getUnsplashPhotos } from "./unsplash-images";

export default async function fetchCoffeeStores(
  latLong = "43.65267,-79.39545",
  limit = 8
) {
  const photos = await getUnsplashPhotos();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
    },
  };

  const data = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=coffee%20stores&limit=${limit}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((err) => console.error(err));
  const dataWithImages = data.map((item, index) => {
    return {
      ...item,
      imgUrl: photos[index],
    };
  });
  return dataWithImages;
}
