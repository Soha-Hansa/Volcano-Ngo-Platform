const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'volcano_jwt_super_secret_session_key_98765';
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions to read/write persistent JSON file database
const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
    return [];
  }
  try {
    const fileData = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(fileData || '[]');
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing database:", error);
  }
};

// Middleware: Authenticate JWT Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

/* ==========================================================================
   Authentication Endpoints
   ========================================================================== */

// 1. Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const {
      role,
      name,
      email,
      password,
      skills,
      availability,
      interest,
      ngoCategory,
      ngoWebsite
    } = req.body;

    // Validate generic inputs
    if (!role || !name || !email || !password) {
      return res.status(400).json({ message: "Missing required registration fields" });
    }

    if (role !== 'volunteer' && role !== 'ngo') {
      return res.status(400).json({ message: "Invalid user role selection" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const users = readUsers();

    // Check if email already registered
    const emailLower = email.toLowerCase().trim();
    const existingUser = users.find(u => u.email.toLowerCase() === emailLower);
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Build user entry depending on role
    const newUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      name: name.trim(),
      email: emailLower,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    if (role === 'volunteer') {
      newUser.skills = skills ? skills.trim() : "";
      newUser.availability = availability || "";
      newUser.interest = interest || "";
      newUser.hoursContributed = 0; // Default volunteer hours tracking
    } else if (role === 'ngo') {
      newUser.ngoCategory = ngoCategory || "";
      newUser.ngoWebsite = ngoWebsite ? ngoWebsite.trim() : "";
      newUser.mission = ""; // Editable fields
      newUser.address = "";
      newUser.phone = "";
      newUser.team = [];
    }

    // Save to file database
    users.push(newUser);
    writeUsers(users);

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Exclude password hash from response
    const { passwordHash: _, ...userResponse } = newUser;

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error during registration" });
  }
});

// 2. Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const users = readUsers();
    const emailLower = email.toLowerCase().trim();

    // Find user
    const user = users.find(u => u.email.toLowerCase() === emailLower);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Exclude password hash from response
    const { passwordHash: _, ...userResponse } = user;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error during sign-in" });
  }
});

// 3. Get Current User Endpoint (Me)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude password hash
    const { passwordHash: _, ...userResponse } = user;

    return res.status(200).json({ user: userResponse });
  } catch (error) {
    console.error("Verify me error:", error);
    return res.status(500).json({ message: "Internal server error during validation" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🌋 Volcano auth server running on port: ${PORT}`);
  console.log(`==================================================`);
});
