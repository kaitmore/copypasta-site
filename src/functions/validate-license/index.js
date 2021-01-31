const { reHash } = require("../../utils/hash.js");
const { lookupLicenseKey } = require("../../utils/db");

// handles a license key from a user and returns whether or not it is valid
exports.handler = async function ({ queryStringParameters }, context) {
  try {
    const { licenseKey } = queryStringParameters;

    console.log("queryStringParameters", queryStringParameters);
    const { generatedHash } = await reHash(licenseKey);

    console.log("generatedHash", generatedHash);
    const isLicenseValid = await lookupLicenseKey(generatedHash);
    return {
      status: 200,
      body: JSON.stringify(isLicenseValid)
    };
    // TODO: lookup hashedLicense in db, if found, license key is valid, else invalid
  } catch (e) {
    return {
      status: 400,
      body: JSON.stringify(e)
    };
  }
};
