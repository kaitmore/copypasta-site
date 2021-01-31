var faunadb = require("faunadb"),
  q = faunadb.query;

const DOCUMENT_NAME = process.env.DOCUMENT_NAME || "licenses";
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const setLicenseKey = async (email, name, licenseKey) =>
  await client.query(
    q.Create(q.Collection(DOCUMENT_NAME), {
      data: { name, licenseKey, email }
    })
  );

const isLicenseValid = async (licenseKey) => {
  const resp = await client.query(
    q.Get(q.Match(q.Index("users_by_license"), licenseKey))
  );
  console.log("RESP", resp);
  return true;
};

module.exports = { setLicenseKey, lookupLicenseKey };
