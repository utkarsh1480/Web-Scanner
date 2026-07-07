import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import analysisRoutes from './routes/analysisRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import { db } from './config/Mongoose.Connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

// Connect to MongoDB first, then start the server
await db();

const app = express();
const PORT = process.env.PORT || 3000;

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: frontendUrl, credentials: true }));  // CORS must be first
app.use(express.json());                                     // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));            // Parse form bodies
app.use(cookieParser());                                    // Parse cookies

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', analysisRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV !== 'production' || process.env.LOCAL_SERVER === 'true') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
  server.on('close', () => console.log('SERVER CLOSED EVENT'));
  process.on('exit', (code) => console.log('PROCESS EXITING with code', code));
}

export default app;
