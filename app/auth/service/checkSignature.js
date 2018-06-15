const crypto = require('crypto');
const db = require('../config/db');

module.exports = signedRequest => {
  return new Promise((resolve, reject) => {
    const splitSignedRequest = signedRequest.split('.');
    const clientSecret = process.env.CLIENT_SECRET;
    const json = new Buffer(splitSignedRequest[0], 'base64').toString('utf8');
    const correctSignature = new Buffer(splitSignedRequest[1], 'base64').toString('utf8');
    const data = JSON.parse(json);
    const decryptedHmac = crypto.createHmac('sha256', clientSecret).update(json).digest('hex');

    if (decryptedHmac === correctSignature) {
        const lookupUser = `SELECT access_token FROM ${data.store_hash} LIMIT 1;`;
        db.query(lookupUser, (error, results, fields) => {
            if (error) return reject(error);
            return resolve([results[0].access_token, data.context]);
        });
    }
  });
};
