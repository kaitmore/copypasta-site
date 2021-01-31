const bcrypt = require("bcrypt");

function genSalt() {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
}

function genHash(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function compare(hashedLicenseKey, licenseKey) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(licenseKey, hashedLicenseKey, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
}

module.exports = { genHash, genSalt, compare };
