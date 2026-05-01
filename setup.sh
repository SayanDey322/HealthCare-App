#!/bin/bash

# Setup script for KidHealth

echo "🌟 Welcome to KidHealth Setup! 🌟"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Create backend .env
echo ""
echo "⚙️ Setting up backend environment..."
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "ℹ️  backend/.env already exists"
fi

# Create frontend .env.local
echo ""
echo "⚙️ Setting up frontend environment..."
if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
else
    echo "ℹ️  frontend/.env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update backend/.env with your MongoDB connection string"
echo "2. Update backend/.env with a secure JWT_SECRET"
echo "3. Run 'npm run dev' from the root directory to start both servers"
echo ""
echo "📚 For more information, see README.md"
