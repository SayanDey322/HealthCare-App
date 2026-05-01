import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { authenticate } from './middleware/auth';
import authRoutes from './routes/authRoutes';
import childRoutes from './routes/childRoutes';
import healthRoutes from './routes/healthRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/children', authenticate, childRoutes);
app.use('/api/health', authenticate, healthRoutes);
app.use('/api/appointments', authenticate, appointmentRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((error: any, req: Request, res: Response) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
