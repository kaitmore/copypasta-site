var faunadb = require("faunadb"),
  q = faunadb.query;

require("dotenv").config();

console.log("process.env.FAUNADB_SECRET", process.env.FAUNADB_SECRET);
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

module.exports = { client, q };
