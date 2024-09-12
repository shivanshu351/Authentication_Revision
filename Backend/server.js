import express from 'express'
import cors from "cors"
import connectDb from './db/db.connect.js';
import User from './models/db.config.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Enter all Details" })
    }
    const isPresent = await User.findOne({email})
    if(isPresent)
    {
            return res.status(400).json({success:false,message:"User already present"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password:hashedPassword });
    
    try {
        try {
            await user.save();
            return res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            console.error("Error creating product:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
    catch (e) {
        return res.status(400).json({ success: false, message: "internal server error" })
    }
})

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password)
    {
        return res.status(400).json({success:false,message:"please enter all details"})
    }

    const userExists = await User.findOne({email});

    if(!userExists)
    {
        return res.status(404).json({success:false,message:"user not found"})
    }
    const userDetails = await User.findOne({email
    })

    const token = jwt.sign({
        name:userDetails.name,
        email : userDetails.email,
    },process.env.SECRET_KEY)
    



})


app.listen(4000, () => {
    connectDb();
    console.log("server is running on port 4000")
})