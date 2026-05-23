# 🌋 Volcano - NGO & Volunteer Match Platform

Volcano is a high-fidelity digital matching platform that bridges the gap between passionate professional volunteers (developers, writers, designers, educators) and registered NGOs seeking skilled talent. The platform features dynamic, glassmorphic UI designs, immersive animations, direct messaging simulations, identity scanning/verification systems, and secure authentication.

---

## 🚀 Key Features

### 1. 💼 Opportunities Finder & Job Cards
* **Custom Search & Filter**: Find live campaigns by keywords or categorize by *Skill-based* vs. *On-ground* opportunities.
* **Job Cards**: Display NGO name, role description, skill tags, time commitment, and location with responsive cards.
* **Direct NGO Chat Integration**: Clicking "Chat with NGO" on any job card triggers a direct conversation window with the respective organization.

### 2. 💬 Communication Subsystems
* **Direct Messaging Widget**: A floating, highly interactive widget (positioned on the bottom-left) that opens specific chats with selected NGOs or Volunteers.
  * *Simulation engine*: Messages sent receive natural, context-aware simulated replies after a 1.25-second animated typing indicator.
  * *Quick Response Chips*: Context-dependent quick-reply chips to draft messages instantly.
  * *Responsive layout*: Auto-centers as a modal dialog when the screen is rotated into **landscape mode** to avoid screen overflows.
* **Volca Support Chatbot**: A global green-blue branded support chatbot assistant (positioned on the bottom-right) capable of answering FAQs (e.g., pricing, campaigns, certificates).

### 3. 🛡️ Identity & Document Verification
* **Volunteer Identity Verification**:
  * Upload page for Aadhaar Card (mandatory) and LinkedIn URL (optional).
  * Plays a 3-second scanner animation showcasing a sliding green laser line and progress bar incrementing 0% to 100%.
  * On success, the profile badge updates to green (`✓`) and the tagline turns to *"Verified Community Champion"*.
  * Displays a clickable link to visit the volunteer's LinkedIn profile if provided.
* **NGO License Verification**:
  * drop zone inside the NGO Dashboard to upload licensing documents.
  * Performs document scan sweeps and updates the public profile card with a verified credential badge and preview modal.

### 4. 📊 Dashboard Analytics & Matchmaking
* **NGO Dashboard**:
  * Real-time charts tracking volunteering hours and active community volunteers.
  * **Smart Matches**: A recommended candidates panel featuring female Bengali profiles (e.g., Priyanka Banerjee, Mouma Das, Debasmita Sen) with one-click Whatsapp redirect chatting (redirects to `wa.me` with pre-filled name-greetings).
* **Volunteer Dashboard**:
  * Interactive achievements boards, volunteer timelines, skill tags, and upcoming calendar schedules.

### 5. 🔑 Auth & Themes
* **JWT Authentication**: Login, Sign up, and logout endpoints powered by a Node.js Express server utilizing bcrypt password hashing and JWT sessions.
* **Persisted Dark Mode**: Sleek dark and light styling options bound to CSS custom properties (`--bg-primary`, `--bg-card`, etc.) and saved in `localStorage`.

---

## 🛠️ Tech Stack

* **Frontend**: React (Hooks, Context, Suspense, Lazy Loading), Vite, Vanilla CSS (harmonious HSL custom property variables).
* **Backend**: Node.js, Express, JSON-file database storage (`Backend/users.json`).
* **Security**: JWT tokens, bcrypt encryption.
* **Aesthetics**: Glassmorphism, CSS keyframe animations (`laserSweep`, `dmSlideInCenter`), Unsplash assets.

---

## 📁 Directory Structure

```text
Volcano-Ngo-Platform/
├── Backend/
│   ├── server.js            # Express API server for authentication
│   └── users.json           # User profiles and document data
├── public/
│   ├── favicorn.png         # Volcano brand favicon logo
│   └── ...
├── src/
│   ├── assets/              # UI vector assets
│   ├── components/          # Reusable UI widgets
│   │   ├── ChatWidget       # Global support assistant widget
│   │   ├── DirectMessageWidget  # Direct messages popup component
│   │   ├── JobCard          # Interactive opportunity card
│   │   └── ...
│   ├── pages/               # Primary application sections
│   │   ├── Home             # Main landing page
│   │   ├── OppoPage         # Opportunity search list
│   │   ├── DashboardUser    # Volunteer private portal
│   │   ├── DashboardNgo     # NGO private analytics portal
│   │   ├── VolunteerProfile # Volunteer public view & identity verification
│   │   └── ...
│   ├── App.jsx              # Main routing and global state controller
│   ├── index.css            # Base design variables and theme definitions
│   └── main.jsx             # React DOM root entry
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) installed.

### Installation

1. Clone the project repository and navigate to the project directory:
   ```bash
   cd "NGO Website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the backend Express server:
   ```bash
   cd Backend
   npm install
   npm start
   ```

2. Start the Vite client application in a separate terminal:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
