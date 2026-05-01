# KidHealth - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Terminal/Command Prompt

### Step 1: Extract and Enter Directory
```bash
cd "Healthcare Application"
```

### Step 2: Run Setup Script

**On Windows:**
```bash
setup.bat
```

**On Mac/Linux:**
```bash
bash setup.sh
```

This will:
- ✅ Check Node.js installation
- ✅ Install all dependencies
- ✅ Create `.env` files from templates

### Step 3: Configure Environment

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kidhealth
JWT_SECRET=your-super-secret-key-change-this!
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Frontend** (`frontend/.env.local`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Development Servers

From the root directory:
```bash
npm run dev
```

This opens both servers:
- 🔧 Backend: http://localhost:5000
- 💻 Frontend: http://localhost:3000

### Step 5: Access the Application

1. Open your browser to `http://localhost:3000`
2. Create an account with your email
3. Add a child profile
4. Start tracking health! 💚

## 📱 Using the Application

### Dashboard
- View all your children's profiles
- Quick access to key features
- See recent health records

### Add Child Profile
- Click "Add Child" on dashboard
- Fill in name, date of birth, gender
- Add blood type and allergies (optional)

### Track Health
- Select a child
- Choose health metric (temperature, heart rate, etc.)
- Enter value and save
- View trends on charts

### Schedule Appointments
- Go to "Appointments" tab
- Select child
- Enter doctor name, reason, and date
- Confirm appointment

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running locally or use cloud MongoDB
- Update `MONGODB_URI` in `backend/.env`

### "Port 5000 already in use"
- Change PORT in `backend/.env`
- Or stop other services using port 5000

### "CORS errors"
- Ensure `CORS_ORIGIN` matches your frontend URL
- Clear browser cookies and try again

### Frontend not connecting to backend
- Check `REACT_APP_API_URL` in `frontend/.env.local`
- Ensure backend server is running

## 📁 Key Files to Customize

### Backend
- `backend/src/models/` - Database schemas
- `backend/src/controllers/` - Business logic
- `backend/src/routes/` - API endpoints

### Frontend
- `frontend/src/pages/` - Page components
- `frontend/src/components/` - Reusable components
- `frontend/tailwind.config.js` - Style customization

## 🎨 Customizing Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  kidhealth: {
    primary: '#6366f1',      // Change primary color
    secondary: '#ec4899',    // Change secondary color
    accent: '#f59e0b',       // Change accent color
  },
}
```

## 📚 API Documentation

See [Full API Docs](./API_DOCS.md) for detailed endpoints

## 🆘 Need Help?

Check these resources:
1. README.md - Full project documentation
2. API_DOCS.md - API endpoint details
3. Comments in code files
4. TypeScript types in `types/` folders

## 🚀 Next Steps

1. Customize branding (colors, logo)
2. Add more health metrics
3. Deploy to production
4. Add notifications
5. Create mobile app version

---

**Happy monitoring!** 💚📊
