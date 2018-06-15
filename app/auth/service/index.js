const express = require('express');
require('express-async-errors');
const checkSignature = require('./checkSignature');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query !== undefined) {
        const signature = checkSignature(req.query['signed_payload']).catch(function (e) {
            console.log(e);
            res.send('<p>Signature check failed!<p>');
        }).then(function (data) {
            console.log(data);
            res.send('<p>Hello!<p>');
        });
    }
});

module.exports = router;
