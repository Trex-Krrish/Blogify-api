// require('dotenv').config()
const user = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const store = async (req, res) => {
    try {
        const data = req.body;
        const newuser = new user(data)

        if (await user.findOne({ email: newuser.email })) {
            return res.status(400).json({ message: "Email already exists" })
        }

        if (await user.findOne({ username: newuser.username })) {
            return res.status(400).json({ message: "Username already exists" })
        }

        const hashedPassword = await bcrypt.hash(newuser.password, 10);
        newuser.password = hashedPassword;
        await newuser.save()

        res.status(201).json({ message: "User created successfully", data: newuser })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const authenticate = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await user.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const match = await bcrypt.compare(data.password, existingUser.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        // res.json({message: "Verified"})
        const token = jwt.sign({ userId: existingUser._id, }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {
    store,
    authenticate
}