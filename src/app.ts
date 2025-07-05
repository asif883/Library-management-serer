import express, { Application, Request, Response } from 'express';
import cors from 'cors'

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());


// book API routes



// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Library Management API is Running');
});




export default app;
