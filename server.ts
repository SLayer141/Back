import express, { Request, Response } from 'express';
import { AppDataSource } from './db/data-source';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import helmet from 'helmet';

const port = process.env.PORT;
const app = express();

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://front-indol-psi.vercel.app',
}));

// Set Content Security Policy using helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
    },
  })
);

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.use(userRoutes);

app.use('/api/products', productRoutes);

app.post('/', (req: Request, res: Response) => {
  console.log('Hello from the server!');
  res.send('Hello from the server!');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the server!');
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(Number(port), '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

export default app; 