var faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

module.exports = { client, q };
