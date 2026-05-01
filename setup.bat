@echo off
REM Setup script for KidHealth (Windows)

echo.
echo 🌟 Welcome to KidHealth Setup! 🌟
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version:
node --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install-all

REM Create backend .env
echo.
echo ⚙️ Setting up backend environment...
if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✅ Created backend\.env
) else (
    echo ℹ️  backend\.env already exists
)

REM Create frontend .env.local
echo.
echo ⚙️ Setting up frontend environment...
if not exist "frontend\.env.local" (
    copy frontend\.env.example frontend\.env.local
    echo ✅ Created frontend\.env.local
) else (
    echo ℹ️  frontend\.env.local already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update backend\.env with your MongoDB connection string
echo 2. Update backend\.env with a secure JWT_SECRET
echo 3. Run 'npm run dev' from the root directory to start both servers
echo.
echo 📚 For more information, see README.md
echo.
pause
