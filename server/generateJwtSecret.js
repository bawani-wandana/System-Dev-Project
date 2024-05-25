const crypto = require('crypto');

// Generate a random 256-bit (32-byte) secret key in base64 format

const generateSecret= () => {
    return crypto.randomBytes(64).toString('hex');
}

console.log(generateSecret());
