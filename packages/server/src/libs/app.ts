import { errorHandler } from '#server/middlewares/errorHandler';
import { auth } from '#server/routes/auth';
import { my } from '#server/routes/my';
import cors from 'cors';
import express from 'express';

export const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Attach routes
app.use('/auth', auth);
app.use('/my', my);

app.use(errorHandler);
