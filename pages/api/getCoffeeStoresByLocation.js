import fetchCoffeeStores from "../../lib/coffee-stores";

export default async function getCoffeeStoresByLocation(req, res) {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500);
    res.json({ message: "Oh no!!!", error });
  }
}
