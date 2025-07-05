import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { errorHandler } from './app/middleware/errorHandler';
import bookRoutes from './app/modules/book/book.route';
import borrowRoutes from './app/modules/borrow/borrow.route';

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());


// book API routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);


// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Library Management server is Running');
});


app.use(errorHandler)

export default app;
