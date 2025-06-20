import express, { Request, Response } from 'express';
import { AppDataSource } from './db/data-source';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

const port = process.env.PORT || 3000;
const app = express();

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
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

export default app; 