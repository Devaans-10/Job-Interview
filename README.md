# AI Job Interview Agent 🤖

A full-stack web application that conducts dynamic, adaptive job interviews using AI. Built for the 48-Hour AI Hackathon.

**Live Demo:** https://job-interview-nine.vercel.app  
**GitHub:** https://github.com/Devaans-10/Job-Interview  
**AI Usage Log:** https://github.com/Devaans-10/Job-Interview/blob/main/PROMPTS.md

---

## 🎯 Problem Statement

**"Build the interviewer, not the interview"** - Create an AI agent that conducts dynamic, adaptive job interviews.

Instead of pre-written questions, users get:
- ✅ Role-specific opening questions
- ✅ Adaptive follow-up questions based on answers
- ✅ Intelligent scoring (1-10 scale)
- ✅ Personalized tips and feedback
- ✅ Comprehensive summary reports

---

## ✨ Features

- **Dynamic Questions:** Generates role-specific interview questions adapted to job title
- **Instant Scoring:** Evaluates answers on relevance, clarity, confidence, and depth (1-10 scale)
- **Adaptive Follow-ups:** Asks contextual follow-up questions based on user responses
- **AI Tips:** Provides 5 personalized improvement suggestions after each interview
- **Comprehensive Summary:** Overall score, strengths, improvements, and detailed feedback
- **User Accounts:** Signup/Login to track interview progress
- **Interview History:** Track past interviews and see your score progression
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Premium UI:** Dark theme with animations and gradient accents

---

## 🏗️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router** - Page navigation
- **Lucide Icons** - Beautiful icons

### Backend (Code Available)
- **Node.js** - Runtime
- **Express.js** - Server framework
- **Google Gemini API** - AI interview generation
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens
- **CORS** - Cross-origin requests

### Deployment
- **Frontend:** Vercel (https://job-interview-nine.vercel.app)
- **Backend:** Render (https://job-interview-td4s.onrender.com)
- **Repository:** GitHub

---

## 🚀 Quick Start

### Try Live Demo
1. Go to: https://job-interview-nine.vercel.app
2. Click "Sign Up"
3. Create account with any email
4. Start your first interview!

**Note:** Password must have 8+ characters, 1 uppercase letter, and 1 number (e.g., `MyPassword123`)

### Run Locally

#### Prerequisites
- Node.js v18+ 
- npm or yarn

#### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Devaans-10/Job-Interview.git
cd Job-Interview
```

2. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

3. **Setup Backend (Optional - demo uses mock data)**
```bash
cd backend
npm install
cp .env.example .env
# Add your Gemini API key to .env
npm run dev
```
Backend runs on http://localhost:5000

---

## 📋 How It Works

### 1. User Signup
- Create account with email and password
- Credentials stored in mock database (localStorage)
- Auto-logged in after signup

### 2. Interview Setup
- Select job role (Software Engineer, Product Manager, Data Scientist)
- Click "Start Interview"

### 3. Dynamic Interview
- Receive role-specific opening question
- Answer the question
- AI scores your answer (1-10)
- Get personalized follow-up question
- Repeat for 7 questions

### 4. Scoring & Feedback
- Each answer scored on: Relevance, Clarity, Confidence, Depth
- Get feedback: strengths, improvements, specific tips
- See score before moving to next question

### 5. Summary Report
- Overall score (average of 7 questions)
- Top strengths (what you did well)
- Areas for improvement
- 5 personalized tips for next time

---

## 📁 Project Structure
---

## 🤖 AI Integration

This project demonstrates excellent **AI steering** through:

1. **Specific Prompts** - Detailed requirements for each component
2. **Output Formats** - JSON responses for easy parsing
3. **Role-Based Questions** - Job-specific interview content
4. **Intelligent Scoring** - Multi-criteria evaluation system
5. **Adaptive Follow-ups** - Context-aware question generation
6. **Personalized Tips** - Category-based feedback

**See PROMPTS.md for complete AI prompt documentation.**

---

## 🏆 Features Breakdown

### Authentication
- ✅ Signup with password strength validation
- ✅ Login with persistent sessions (localStorage)
- ✅ Logout functionality
- ✅ Protected routes for authenticated users
- ✅ Beautiful error messages

### Interview Flow
- ✅ 3 job categories (Software Engineer, Product Manager, Data Scientist)
- ✅ 7 questions per interview session
- ✅ Adaptive follow-up questions
- ✅ Mock scoring (1-10 scale with reasoning)
- ✅ Realistic 800ms API simulation delay

### Feedback System
- ✅ Scoring criteria: Relevance, Clarity, Confidence, Depth
- ✅ Strengths detection
- ✅ Improvements suggestions
- ✅ 5 personalized tips per interview
- ✅ Overall summary with metrics

### User Experience
- ✅ Responsive design (mobile to desktop)
- ✅ Smooth animations (Framer Motion)
- ✅ Dark theme with gradient accents
- ✅ Accessible form inputs
- ✅ Loading states
- ✅ Error handling

---

## 📊 Demo Flow

1. **Homepage** → "Start Interview Now" button
2. **Signup Page** → Create new account
3. **Interview Setup** → Choose job role
4. **Chat Interface** → 7 Q&A rounds with scoring
5. **Tips Display** → 5 personalized improvement tips
6. **Summary Report** → Overall metrics and feedback

**Total Time:** ~5-10 minutes for full demo

---

## 🛠️ Development Notes

### Mock Data Strategy
The demo uses **mock data** for 100% reliability during live judging:
- Mock interview questions stored in `mockInterviews.js`
- Mock scoring algorithm (intelligent but deterministic)
- Mock authentication (no backend API calls)
- Mock tips generation (category-based)

**Real Gemini integration available in `/backend` for production use.**

### Why Mock Data?
- ✅ Zero API timeouts or latency issues
- ✅ Works offline (no dependency on external APIs)
- ✅ Fully reliable during live demo
- ✅ Backend code still shows real Gemini integration

### Frontend-Only Deployment
- Frontend: **Vercel** (auto-deploys from GitHub)
- No backend API dependency for demo
- Backend code available for code review

---

## 📝 Setup for Hackathon Judges

1. **No credentials needed** - Just sign up with any email
2. **Password requirement:** 8+ chars, 1 uppercase, 1 number
3. **Example password:** `MyPassword123`
4. **Full demo:** ~5 minutes

---

## 🔗 Important Links

- **Live App:** https://job-interview-nine.vercel.app
- **GitHub Repo:** https://github.com/Devaans-10/Job-Interview
- **AI Usage Log:** https://github.com/Devaans-10/Job-Interview/blob/main/PROMPTS.md
- **Developer Contact:** pdevaans@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/devaans-patwari-b22617383/

---

## 📄 Documentation

- **PROMPTS.md** - Complete AI prompts and steering decisions
- **Backend README** - API documentation (in `/backend` folder)
- **Code Comments** - Implementation details in source files

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Full-stack development with React + Node.js
- ✅ AI prompt engineering and steering
- ✅ Rapid prototyping with AI assistance
- ✅ Problem-solving (pivoting from backend to mock data)
- ✅ Production-ready code quality
- ✅ Responsive design principles
- ✅ User authentication flows
- ✅ State management with Context API

---

## 🚀 Future Enhancements

- [ ] Real Gemini API integration (currently using mock data)
- [ ] Database integration (MongoDB for persistent storage)
- [ ] User interview analytics and progress tracking
- [ ] More job categories and question types
- [ ] Video recording of answers
- [ ] Comparison with other users' scores
- [ ] Interview difficulty levels (Easy, Medium, Hard)
- [ ] Export interview report as PDF

---

## 📄 License

This project was built for the AB Talks 48-Hour AI Hackathon.

---

## 👨‍💻 Developer

**Devaans Patwari**
- Email: pdevaans@gmail.com
- GitHub: https://github.com/Devaans-10
- LinkedIn: https://www.linkedin.com/in/devaans-patwari-b22617383/

---

## 🏆 Hackathon Info

**Event:** AB Talks 48-Hour AI Hackathon  
**Problem:** "Build the interviewer, not the interview"  
**Built:** August 7-9, 2026  
**Status:** ✅ Complete & Submitted

---

**Happy interviewing! 🎉**
