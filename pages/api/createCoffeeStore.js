import { getRecords, table } from "../../lib/airtable";

export default async function createCoffeeStore(req, res) {
  if (req.method === "POST") {
    const { id, name, neighborhood, address, imgUrl, voting } = req.body;
    try {
      if (id) {
        const findCoffeeRecords = table
          .select({
            filterByFormula: `id="${id}"`,
          })
          .firstPage();
        if (findCoffeeRecords.length > 0) {
          const records = await getRecords(findCoffeeRecords);
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: { id, name, address, neighborhood, voting, imgUrl },
              },
            ]);
            const records = getRecords(createRecords);
            res.json({ message: "created a record", records: records });
          } else {
            res.status(400);
            res.json({ message: "id or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (error) {
      console.log("error finding/creating store", error);
      res.status(500).json({ message: "error finding/creating store", error });
    }
  }
}
