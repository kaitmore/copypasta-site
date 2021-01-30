const { genHash, genSalt } = require("../../utils/hash.js");

// handles a license key from a user and returns whether or not it is valid
exports.handler = async function ({ queryStringParameters }, context) {
  try {
    const { licenseKey } = queryStringParameters;
    const salt = await genSalt();
    const hashedLicenseKey = await genHash(salt, licenseKey);

    // TODO: lookup hashedLicense in db, if found, license key is valid, else invalid
  } catch (e) {
    return {
      status: 400
    };
  }
};
