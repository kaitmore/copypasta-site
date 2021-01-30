var faunadb = require("faunadb"),
  q = faunadb.query;

require("dotenv").config();

console.log("process.env.FAUNADB_SECRET", process.env.FAUNADB_SECRET);
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
client
  .query(
    q.Create(q.Collection("licenses"), {
      data: { title: "What I had for breakfast .." }
    })
  )
  .then((ret) => console.log("RETURN QUERY", ret))
  .catch(console.log);
module.exports = { client, q };
