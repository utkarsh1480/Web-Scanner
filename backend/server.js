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

const app = express();
const PORT = process.env.PORT || 3000;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Build a list of allowed origins from env + sensible defaults.
// FRONTEND_URL can be a comma-separated list of allowed origins, e.g.:
//   https://web-scanner.vercel.app,http://localhost:5173
const rawOrigins = process.env.FRONTEND_URL || 'http://localhost:5173';
const allowedOrigins = rawOrigins
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (curl, Postman, same-origin server calls)
            if (!origin) return callback(null, true);
            // Allow any *.vercel.app subdomain so preview deployments also work
            const isVercel = /\.vercel\.app$/.test(origin);
            if (isVercel || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            console.warn(`CORS blocked origin: ${origin}`);
            return callback(new Error(`CORS policy: origin ${origin} not allowed`));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: '10mb' }));           // Parse JSON bodies (up to 10MB for avatar base64)
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Parse form bodies
app.use(cookieParser());                             // Parse cookies

// ── Lazy / cached MongoDB connection ─────────────────────────────────────────
// Using a middleware instead of a top-level await keeps Vercel serverless
// cold-starts from failing when the DB is momentarily unreachable.
let dbConnected = false;
app.use(async (_req, _res, next) => {
    if (!dbConnected) {
        try {
            await db();
            dbConnected = true;
        } catch (err) {
            console.error('MongoDB connection error:', err.message);
            // Don't crash the whole request — routes that don't need DB will still work
        }
    }
    next();
});

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
