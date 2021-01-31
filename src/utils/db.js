var faunadb = require("faunadb"),
  q = faunadb.query;
const { compare } = require("./hash");
require("dotenv").config();

const DOCUMENT_NAME = process.env.DOCUMENT_NAME || "licenses";
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const setLicenseKey = async (email, name, licenseKey) =>
  await client.query(
    q.Create(q.Collection(DOCUMENT_NAME), {
      data: { name, licenseKey, email }
    })
  );

const isLicenseValid = async (licenseKey) => {
  let result;
  try {
    result = await _getPaginatedEntries();
    const isValid = await _findMatchingLicense(result.data, licenseKey);
    if (isValid) return true;
    if (result.after) {
      while (result.after) {
        result = await _getPaginatedEntries(result.after);
        const isValid = await _findMatchingLicense(result.data, licenseKey);
        if (isValid) return true;
      }
    }
  } catch (e) {
    console.log("ERROR in isLicenseValid", e);
  }
  console.log("No matches");

  return false;
};

const _getPaginatedEntries = async (after) => {
  let opts = {};
  if (after) opts.after = after;
  return await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("licenses")), opts),
      q.Lambda((x) => q.Get(x))
    )
  );
};

const _findMatchingLicense = async (entries, licenseKey) => {
  for (let i = 0; i < entries.length; i++) {
    const license = entries[i].data;
    const isValid = await compare(license.licenseKey, licenseKey);
    if (isValid) return true;
  }
};

module.exports = { setLicenseKey, isLicenseValid };
