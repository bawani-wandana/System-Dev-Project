require('dotenv').config();

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: '2h',
}

module.exports = { jwtConfig };