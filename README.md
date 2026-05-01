# KidHealth - Full Stack Healthcare Application for Children

A comprehensive, modern healthcare monitoring application designed specifically for children, built with **TypeScript**, **React**, **Node.js**, and **TailwindCSS**.

## 🌟 Features

### For Parents/Guardians
- **Child Health Profiles**: Create and manage profiles for multiple children
- **Health Monitoring**: Track vital signs (temperature, heart rate, weight, height, sleep, activity)
- **Doctor Appointments**: Schedule, view, and manage medical appointments
- **Health Analytics**: Visual charts and trends of health metrics
- **Medication Tracking**: Keep track of prescribed medications
- **Secure Authentication**: JWT-based authentication with encrypted passwords

### UI/UX Highlights
- **Child-Friendly Design**: Colorful, engaging interface with emojis and playful animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **TailwindCSS Styling**: Modern, utility-first CSS framework for beautiful design
- **Intuitive Navigation**: Easy-to-use dashboard and navigation
- **Real-time Data**: Instant updates and smooth interactions

## 🏗️ Project Structure

```
Healthcare Application/
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB schemas
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth and utilities
│   │   ├── services/         # Business logic
│   │   ├── config/           # Database configuration
│   │   ├── types.ts          # TypeScript types
│   │   └── index.ts          # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React Context for state
│   │   ├── services/         # API services
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # Main app component
│   │   ├── index.tsx         # React entry point
│   │   └── index.css         # Tailwind CSS
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── package.json              # Root package configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (local or cloud)
- **npm** or **yarn**

### Installation

1. **Clone/Navigate to the project directory**
   ```bash
   cd "Healthcare Application"
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your MongoDB URI**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kidhealth
   JWT_SECRET=your_secure_secret_key_here
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Create `.env.local` file**
   ```bash
   cp .env.example .env.local
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`

### Running Both Simultaneously

From the root directory:
```bash
npm run dev
```

This runs both frontend and backend concurrently using `concurrently`.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Children Management
- `POST /api/children` - Create child profile
- `GET /api/children` - Get all children
- `GET /api/children/:childId` - Get specific child
- `PUT /api/children/:childId` - Update child profile
- `DELETE /api/children/:childId` - Delete child profile

### Health Records
- `POST /api/health` - Add health record
- `GET /api/health/:childId` - Get child's health records
- `GET /api/health/:childId/stats` - Get health statistics
- `DELETE /api/health/:recordId` - Delete health record

### Appointments
- `POST /api/appointments` - Schedule appointment
- `GET /api/appointments/:childId` - Get child's appointments
- `PUT /api/appointments/:appointmentId` - Update appointment
- `DELETE /api/appointments/:appointmentId` - Cancel appointment

## 🎨 Technology Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **TailwindCSS** - Utility-first CSS
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Icons** - Icon library
- **date-fns** - Date utilities

## 🎯 Key Features

### Dashboard
- Overview of all children
- Quick access to health records and appointments
- Recent health data display
- Add new child profiles

### Health Tracking
- Track multiple health metrics (temperature, heart rate, weight, height, sleep, activity)
- Visual charts showing trends
- Add notes to records
- Filter records by type

### Appointments
- Schedule doctor visits
- View upcoming and past appointments
- Update appointment status
- Add appointment notes

### Authentication
- Secure registration and login
- JWT token-based authentication
- Password encryption with bcryptjs
- Protected routes

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Protected API endpoints
- Ownership verification for data access

## 📱 Responsive Design

- Mobile-first approach
- Fully responsive layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🎨 Design Highlights

- **Color Scheme**: 
  - Primary: #6366f1 (Indigo)
  - Secondary: #ec4899 (Pink)
  - Accent: #f59e0b (Amber)

- **Typography**: Clean, modern font with good readability
- **Animations**: Smooth transitions and hover effects
- **Emojis**: Child-friendly visual elements (👶, 💚, 📊, 🏥, etc.)

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kidhealth
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Backend (Heroku/Render/Railway)
```bash
npm run build
npm start
```

### Frontend (Vercel/Netlify)
```bash
npm run build
```

## 📖 Usage Guide

1. **Create Account**: Register as a parent/guardian
2. **Add Children**: Create profiles for each child
3. **Track Health**: Add health records regularly
4. **Schedule Appointments**: Book doctor visits
5. **Monitor Progress**: View charts and health analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📄 License

This project is open source and available for personal and educational use.

## 💡 Future Enhancements

- Mobile app (React Native)
- Doctor portal access
- Telemedicine integration
- Medication reminders with notifications
- Growth chart percentile tracking
- Vaccine schedule tracking
- Integration with fitness trackers
- Dark mode
- Multi-language support

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for children's health** 💚
#   H e a l t h C a r e - A p p  
 