const crypto = require('crypto');
const db = require('./db');

module.exports = signedRequest => {
  return new Promise((resolve, reject) => {
    signedRequest = signedRequest.split('.');

    const clientSecret = process.env.CLIENT_SECRET;

    const correctSignature = new Buffer(signedRequest[1], 'base64').toString('utf8');
    const json = new Buffer(signedRequest[0], 'base64').toString('utf8');
    const data = JSON.parse(json);
    const decryptedHmac = crypto
      .createHmac('sha256', clientSecret)
      .update(json)
      .digest('hex');

    if (decryptedHmac === correctSignature) {
      const lookupUser = `SELECT access_token FROM ${data.store_hash} LIMIT 1;`;
      const addUserToTable = `INSERT INTO ${data.store_hash} VALUES ('null','${data.scope}',${data.user.id},'${data.user.username}','${data.user.email}','user');`;

      db.query(lookupUser, (error, results, fields) => {
        if (error) {
          reject(error);
        }
        if (results[0] !== undefined) {
          resolve([results[0].access_token, data.context]);
        } else {
          console.log(results[0]);
        }
      });
    }
  });
};
