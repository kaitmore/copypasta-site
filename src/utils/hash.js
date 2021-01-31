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

function reHash(incomingHash) {
  // extract salt from existing has (30 characters)
  let salt = incomingHash.substr(0, 30);
  console.log("incomingHash", incomingHash);
  return new Promise((resolve, reject) => {
    bcrypt.hash(incomingHash, salt, function (err, generatedHash) {
      if (err) {
        reject({
          err,
          incomingHash, // stored hash
          generatedHash // generated hash
        });
      } else {
        resolve({
          generatedHash // generated hash
        });
      }
    });
  });
}
module.exports = { genHash, genSalt, reHash };
