import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Check if user already exists
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            // Provide specific error message
            const message = userExists.email === email
                ? 'Email is already registered'
                : 'Username is already taken';
            return res.status(400).json({ message });
        }

        // 2. Create user (password hashing handled in User model pre-save hook)
        const user = await User.create({
            username,
            email,
            password,
        });

        // 3. Return user data + token
        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        // Handle Mongoose validation errors nicely
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email (include password field which is select: false)
        const user = await User.findOne({ email }).select('+password');

        // 2. Check user and password match
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};
