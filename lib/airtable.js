const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores");

const getRecords = async (records) => {
  return (await records).map((i) => {
    return { ...i.fields };
  });
};

export { table, getRecords };
