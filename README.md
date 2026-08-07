# AI Job Interview Agent

A full-stack web application that conducts dynamic, adaptive job interviews using the Gemini AI API. Built for a 48-hour hackathon MVP.

## Features
- **Dynamic Questions:** Generates role-specific opening questions and adaptive follow-ups based on user answers.
- **Instant Scoring:** Evaluates answers instantly (1-10 scale) with concise reasoning, strengths, and areas for improvement.
- **Comprehensive Summary:** Provides an overall score and detailed feedback report at the end of the session.
- **Modern UI:** Built with React and Tailwind CSS for a premium, responsive experience.

## Project Structure
- `/frontend` - React 18, Vite, Tailwind CSS application
- `/backend` - Node.js, Express, Gemini API server
- `PROMPTS.md` - Documentation of all AI prompts used in the backend

## Prerequisites
- Node.js (v18+ recommended)
- A Google Gemini API Key

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_actual_key_here
   PORT=5000
   ```
5. Start the server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Verify the API URL in `.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Go to Vercel and import the project.
3. Set the Root Directory to `frontend`.
4. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
5. Add the Environment Variable `VITE_API_URL` pointing to your deployed backend URL.
6. Deploy.

### Backend (Railway/Render)
1. Create a new Web Service on Railway or Render connected to your GitHub repo.
2. Set the Root Directory to `backend` (or configure the start command as `cd backend && node server.js`).
3. Add the Environment Variable `GEMINI_API_KEY`.
4. Deploy and copy the provided backend URL to use in your frontend Vercel deployment.
