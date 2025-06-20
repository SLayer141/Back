import express, { Request, Response } from 'express';
import { AppDataSource } from './db/data-source';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const port = process.env.PORT ;
const app = express();

// Set Content Security Policy header to allow fonts, scripts, and styles from self
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src 'self';"
  );
  next();
});

app.use(express.json());

app.use(userRoutes);

app.use('/api/products', productRoutes);

app.post('/', (req: Request, res: Response) => {
  console.log('Hello from the server!');
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