import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser package

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS

mongoose.connect(MONGOURL).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log('Error:', err);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    password: String,
    email: String,
    isMedic: Boolean,
    university: String

});

const User = mongoose.model('users', userSchema);

app.post('/signup', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log received data to the console
        const { firstName, lastName, email, password, medic, university, file } = req.body;

        // Create a new user document
        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            isMedic: medic === 'true',
            university: university
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log received data to the console
        const { email, password } = req.body;

        // Search for a user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If user not found, return 404 Not Found
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the provided password matches the user's password
        if (password !== user.password) {
            console.log('Invalid password');
            // If password doesn't match, return 401 Unauthorized
            return res.status(401).json({ error: 'Invalid password' });
        }

        // If email and password are correct, return the user data
        res.json(user);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});
