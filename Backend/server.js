import express from 'express';
import cors from 'cors';
import connectDb from './db/db.connect.js';
import User from './models/db.config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Enter all Details' });
    }

    const isPresent = await User.findOne({ email });
    if (isPresent) {
        return res.status(400).json({ success: false, message: 'User already present' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    try {
        await user.save();
        return res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Corrected /quote endpoint to verify the token and update the user's quote
app.post('/quote', async (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;

        // Update user's quote
        const updatedUser = await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

        if (updatedUser.nModified === 0) {
            return res.status(404).json({ success: false, message: 'User not found or quote not updated' });
        }

        return res.status(200).json({ success: true, message: 'Quote updated successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
});

// User login endpoint to generate token
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all details' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign(
        { name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' } // Token expiration time
    );

    return res.status(200).json({ success: true, message: 'User logged in', token: token });
});

app.listen(4000, () => {
    connectDb();
    console.log('Server is running on port 4000');
});
