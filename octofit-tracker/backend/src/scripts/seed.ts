import { connectToDatabase } from '../config/database';
import { seedData } from '../models';

const runSeed = async () => {
  console.log('Seed the octofit_db database with test data');
  await connectToDatabase();

  try {
    await seedData();
    console.log('Seed complete.');
  } finally {
    const mongoose = await import('mongoose');
    await mongoose.default.disconnect();
  }
};

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
