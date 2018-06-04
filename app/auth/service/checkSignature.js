const crypto = require('crypto');
const db = require('./db');

function lookupToken(data) {
  const lookupUser = `SELECT access_token FROM ${data.store_hash} LIMIT 1;`;
  const addUserToTable = `
  INSERT INTO ${data.store_hash} VALUES (
    'null',
    '${data.scope}',
    '${data.user.id},'
    '${data.user.username}',
    '${data.user.email}',
    'user'
  );`;

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

module.exports = signedRequest => {
  return new Promise((resolve, reject) => {
    const splitSignedRequest = signedRequest.split('.');
    const clientSecret = process.env.CLIENT_SECRET;
    const json = new Buffer(splitSignedRequest[0], 'base64').toString('utf8');
    const correctSignature = new Buffer(splitSignedRequest[1], 'base64').toString('utf8');
    const data = JSON.parse(json);
    const decryptedHmac = crypto
      .createHmac('sha256', clientSecret)
      .update(json)
      .digest('hex');

    if (decryptedHmac === correctSignature) {
      lookupToken(data);
    }
  });
};
