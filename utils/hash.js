const crypto = require('crypto');

module.exports = ({ data, hash, inputEncoding = 'utf8' }) =>
  crypto
    .createHash(hash)
    .update(data, inputEncoding)
    .digest('hex');
