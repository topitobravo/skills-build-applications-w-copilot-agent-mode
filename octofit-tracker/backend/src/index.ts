import express from 'express';
import { PORT, Url } from './server';
import { connectToDatabase } from './config/database';
import routes from './routes';
import { seedData } from './models';

const app = express();

app.use(express.json());
app.use('/api', routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker API is running', Url });
});

const startServer = async () => {
  await connectToDatabase();
  await seedData();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`API base URL: ${Url}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
