const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtController = (() => {
  return {
    signToken() {
      const privateKey = fs.readFileSync('./private.key');
      const payload = { name: 'admin' };
      const options = {
        algorithm: 'RS256',
        expiresIn: '2h'
      };

      return jwt.sign(payload, privateKey, options);
    },

    verifyToken(token) {
      const cert = fs.readFileSync('./public.key');
      let result;

      try {
        result = jwt.verify(token, cert);
      }
      catch (e) {
        result = e;
      }

      return result;
    }
  };
})();

exports.controller = jwtController;
