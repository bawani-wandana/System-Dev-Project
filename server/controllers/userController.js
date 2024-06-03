
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/jwt')
const { createUser, createUserRole, checkUserByEmail, getUserByEmail } = require('../models/userModels')
const { generateUserID } = require('../helpers/generateUserID')


exports.createAccount = async (req, res) => {
    const { userName, firstName, lastName, email, phoneNumber, password } = req.body;
    try {
        checkUserByEmail(email, async (err, results) => {
            if (err) {
                console.error('Error checking user existence:', err);
                return res.status(500).json("Error");
            }
            if (results.length > 0) {
                return res.status(400).json("User already exists");
            }
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                generateUserID(async (err, userID) => {
                    if (err) {
                        console.error('Error generating userID:', err);
                        return res.status(500).json({ message: "Internal server error" });
                    }

                    const user = {
                        userID,
                        userName,
                        firstName,
                        lastName,
                        email,
                        phoneNumber,
                        password: hashedPassword, //Storing hashed confirm password
                    };

                    createUser(user, (err, results) => {
                        if (err) {
                            console.error('Error creating account:', err);
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        const userTypeID = 3; //Assuming the initial userType as the Customer.

                        createUserRole(userID, userTypeID, (err, results) => {
                            if (err) {
                                console.error("Error Assigning user role", err);
                                return res.status(500).json({ message: "Internal server error" });
                            }
                            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                                expiresIn: jwtConfig.expiresIn,
                            });
                            return res.status(201).json({ message: "User Created successfullly", token });
                        });
                    });
                });
            } catch (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ message: "Internal server Error" });
            }
        });
    } catch (err) {
        console.error("Error Checking existing user", err);
        return res.status(500).json({ message: "Internal server error" });
    };
};


//Login configuration
exports.login = (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log(`Received login request for email: ${email}`);
    console.log(`Received login request for email: ${password}`);

    getUserByEmail(email, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Internal server error' });
            if (!isMatch)
                return res.status(400).json({ message: 'Invalid credentials' });


            const token = jwt.sign(
                {
                    id: user.userID,
                    email: user.email,
                    userType: user.userType,
                    userTypeID: user.userTypeID,
                },
                jwtConfig.secret,
                { expiresIn: jwtConfig.expiresIn }
            );

            return res.json({ token });
        });
    });
};


