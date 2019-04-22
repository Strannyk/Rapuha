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

      try {
        return jwt.verify(token, cert);
      }
      catch (e) {
        return null;
      }
    }
  };
})();

module.exports = jwtController;
