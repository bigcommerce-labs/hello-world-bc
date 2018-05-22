const express = require('express');
const https = require('https');
const querystring = require('querystring');
const db = require('../lib/db');
const authorize = require('../lib/request');

const router = express.Router();

router.get('/', (req, res) => {
  authorize.config = {
    host: 'login.bigcommerce.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const requestBody = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
    scope: req.query.scope,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
    context: req.query.context
  });

  authorize(authorize.config, requestBody)
    .then(response => {
      let storeHash = response.context;
      storeHash = storeHash.split('/');

      const checkUserExists = `SELECT user_name FROM ${storeHash[1]} WHERE user_name='${response.user.username}';`;
      const createTable = `CREATE TABLE ${storeHash[1]} (access_token varchar(255),scope varchar(255),user_id varchar(255),user_name varchar(255),user_email varchar(255),user_role varchar(255) );`;
      const addUserToTable = `INSERT INTO ${storeHash[1]} VALUES ('${response.access_token}','${response.scope}',${response.user.id},'${response.user.username}','${response.user.email}','owner');`;

      db.query(createTable, (error, results, fields) => {
        if (error) {
          console.log(`Table for ${storeHash[1]} already exists.`);
        }
      });
      db.query(checkUserExists, (error, results, fields) => {
        if (error) {
          console.log(error);
        }
        if (results[0] !== undefined) {
          console.log(`${results[0].user_name} exists in database`);
          res.send('<p>Installation successful</p>');
        } else {
          db.query(addUserToTable, (error, results, fields) => {
            if (error) {
              console.log(error);
            }
          });
          res.send('<p>Installation successful</p>');
        }
      });
    })
    .catch(err => {
      console.log(`ERROR: ${err}`);
      res.json(err);
    });
});

module.exports = router;
