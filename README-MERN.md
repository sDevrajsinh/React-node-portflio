# MERN Stack Upgrade Guide

This project has been successfully converted into a full MERN stack application, featuring an admin dashboard, analytics, dynamic projects API, and a secure backend.

## Folder Structure
- **`/client`**: React Frontend.
  - Features a `src/services/apiService.js` for clean Axios calls.
- **`/server`**: Node.js Backend.
  - **`models/`**: Mongoose models for `User` (Admin), `Project`, `Message`, `Visitor`, and `ResumeDownload`.
  - **`controllers/`**: Logic for managing auth, projects, contacts, visitor tracking, and resume downloads.
  - **`routes/`**: Express routes mapping API endpoints to controller logic.
  - **`middleware/`**: JWT Auth middleware (`authMiddleware.js`) protecting admin-only routes.
  - **`utils/`**: Helper files (e.g. `generateToken.js` for JWTs).
  - **`config/db.js`**: MongoDB connection setup.
  - **`.env`**: Holds sensitive Environment Variables (MongoDB connection string, JWT secret).

## Frontend Integration
1. **Routing**: `react-router-dom` has been installed. `src/index.js` wraps the application in `<BrowserRouter>`. `App.js` manages multiple routes:
   - `/` - Main portfolio page (Unchanged UI).
   - `/admin` - Admin Login Route.
   - `/admin/dashboard` - Secure Admin Dashboard Route.
2. **API Proxy**: `"proxy": "http://localhost:5000"` was added to the React `package.json` to handle CORS easily during development.
3. **Data Fetching via Axios**:
   - `Portfolio.jsx`: dynamically fetches projects from the database via `/api/projects`, showing skeleton loaders before data arrives. Uses existing local UI data as fallback.
   - `Contact.jsx`: Submits messages via `/api/contact` instead of form resets.
   - `App.js`: Contains passive visitor tracking sending stats to `/api/track` when visitors load the page.
   - `Navbar.jsx` / `Hero.jsx`: Submits resume download events to `/api/resume-download`.

## How to Run the Production-Ready App

### 1. Setup Backend
1. Open a terminal and navigate to the `/server` directory.
2. Run database: Make sure your MongoDB server is running (or add your Atlas URI in `/server/.env`).
   ```bash
   cd server
   npm install
   ```

### 2. Seed Admin User (Optional)
To log in at `/admin`, you need to seed an admin user in your MongoDB database since there are no public signup endpoints. 
You can use a script or manually add an admin in your DB:
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash('password123', 10);
// Insert in User collection: { username: "admin", password: hashedPassword }
```

### 3. Run Backend Server
From the `server` directory, run:
```bash
node server.js
```
The Express API will run on `http://localhost:5000`.

### 4. Run Frontend Client
Open a second terminal, navigate to the React app root directory, and run:
```bash
npm install
npm start
```

React will start on `http://localhost:3000`. 
- Visit `localhost:3000` to view the website.
- Visit `localhost:3000/admin` to access the backend dashboard.

## Next Steps for Production
- In a production environment (like Vercel or Heroku), ensure environment variables are set correctly in the host interface.
- Provide real user authentication details in MongoDB for the admin user.
