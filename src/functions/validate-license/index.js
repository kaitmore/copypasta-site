const { isLicenseValid } = require("../../utils/db");

// handles a license key from a user and returns whether or not it is valid
exports.handler = async function ({ queryStringParameters }, context) {
  try {
    const { licenseKey } = queryStringParameters;

    const isValid = await isLicenseValid(licenseKey);
    if (isValid) {
      return {
        status: 200,
        body: "License is valid"
      };
    } else {
      return {
        status: 404,
        body: "License is not valid"
      };
    }
    // TODO: lookup hashedLicense in db, if found, license key is valid, else invalid
  } catch (e) {
    return {
      status: 400,
      body: JSON.stringify(e)
    };
  }
};
