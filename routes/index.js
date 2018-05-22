const express = require('express');
require('express-async-errors');
const checkSignature = require('../lib/checkSignature');

const router = express.Router();

router.get('/', async (req, res) => {
  const signature = await checkSignature(req.query['signed_payload']);
  res.send('<p>Hello world<p>');
});

module.exports = router;
