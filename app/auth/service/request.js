const https = require('https');

module.exports = (config, payload) => {
  return new Promise((resolve, reject) => {
    const req = https.request(config, response => {

      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (error) {
          console.log('failed to parse response');
          reject(error);
        }
      });
    });
    if (payload) {
      req.write(payload);
    }
    req.end();
  });
};
