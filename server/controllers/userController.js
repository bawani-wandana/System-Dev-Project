const db = require('../config/databaseConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const secretKey = process.env.JWT_SECRET;


const createAccount = async (req, res) => {
    const sql = "INSERT INTO user (`userID`,`userName`, `email`, `firstName`, `lastName`, `phoneNumber`, `password`, `confirmPassword`) VALUES (?)";

    // check if the user already exists
    const checkUserSql = "SELECT * FROM user WHERE `email` = ?";
    db.query(checkUserSql, [email], async (err, results) => {
        if (err) {
            console.error('Error checking user existence:', err);
            return res.status(500).json("Error");
        }
        if (results.length > 0) {
            return res.status(400).json("User already exists");
        }



        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const values = [
                uuidv4(),
                req.body.username,
                req.body.email,
                req.body.firstname,
                req.body.lastname,
                req.body.phonenumber,
                hashedPassword,
                hashedPassword, //Storing hashed confirm password
            ];

            db.query(sql, [values], (err, data) => {
                if (err) {
                    console.error('Error creating account:', err);
                    return res.json("Error");
                }
                return res.json(data);
            });
        } catch (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json("Error");
        }
    });
};

const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE `email`=? AND `password`=?";
    db.query(sql, [req.body.email, req.body.password], async (err, data) => {
        if (err) {
            console.error('Error during login:', err);
            return res.json("Error");
        }
        if (data.length > 0) {
            const user = data[0];
            //Compare the hashed password
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                //Generate JWT
                const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
                return res.json({ message: "success", token });
            }
            else {
                return res.json("Fail");
            }
        } else {
            return res.json("Fail");
        }
    });
};


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json("Invalid Token");
    }
    return next();
};

module.exports = {
    createAccount,
    login,
    verifyToken,
};
