import cookieParser from 'cookie-parser';
import express from 'express';
import { Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes';
import GraphQLServer from "./GraphQLServer";
const Sentry = require('@sentry/node');

// Init express
const app = express();

// Sentry - To catch bug
Sentry.init({ dsn: process.env.SENTRY_PATH });
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);

GraphQLServer(app);

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', BaseRouter);

/**
 * Point express to the 'views' directory. If you're using a
 * single-page-application framework like react or angular
 * which has its own development server, you might want to
 * configure this to only serve the index file while in
 * production mode.
 */
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Sentry - To catch bug
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

// Export express instance
export default app;
