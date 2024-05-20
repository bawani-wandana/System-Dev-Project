const crypto = require('crypto');

// Generate a random 256-bit (32-byte) secret key in base64 format
const secretKey = crypto.randomBytes(32).toString('base64');

console.log(`Generated JWT Secret Key: ${secretKey}`);
