import mongoose from 'mongoose';
import { MONGO_URI } from '../config';
import { seedData } from '../models';

const runSeed = async () => {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO_URI);

  try {
    await seedData();
    console.log('Seed complete.');
  } finally {
    await mongoose.disconnect();
  }
};

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
