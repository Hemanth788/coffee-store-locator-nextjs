import { findRecordByFilter } from "../../lib/airtable";

export default async function getCoffeeStoreById(req, res) {
  const id = req.query.id;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length > 0) {
        res.json(records);
      } else {
        res.json({ message: `${id} not found` });
      }
    } else {
      res.status(400).json({ message: "id is missing" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
