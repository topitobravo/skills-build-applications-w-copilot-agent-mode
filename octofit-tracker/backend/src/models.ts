import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  level: { type: Number, default: 1 },
  favoriteSport: { type: String, default: 'running' },
  city: { type: String, default: 'Seattle' },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  points: { type: Number, default: 0 },
  captain: { type: String, default: 'Lead Athlete' },
  members: { type: Number, default: 1 },
});

const activitySchema = new Schema({
  type: { type: String, required: true },
  durationMinutes: { type: Number, default: 30 },
  calories: { type: Number, default: 0 },
  date: { type: String, required: true },
  userName: { type: String, default: 'Unknown' },
});

const leaderboardSchema = new Schema({
  userName: { type: String, required: true },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
});

const workoutSchema = new Schema({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, default: 30 },
  difficulty: { type: String, default: 'beginner' },
  equipment: { type: String, default: 'bodyweight' },
});

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);

export const seedData = async () => {
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await User.insertMany([
    { name: 'Ava Chen', email: 'ava.chen@example.com', level: 4, favoriteSport: 'cycling', city: 'Seattle' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', level: 3, favoriteSport: 'running', city: 'Denver' },
    { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', level: 5, favoriteSport: 'swimming', city: 'Austin' },
  ]);

  await Team.insertMany([
    { name: 'North Stars', sport: 'Cycling', points: 128, captain: 'Ava Chen', members: 6 },
    { name: 'River Runners', sport: 'Running', points: 104, captain: 'Noah Patel', members: 5 },
    { name: 'Tidal Striders', sport: 'Swimming', points: 116, captain: 'Mina Alvarez', members: 4 },
  ]);

  await Activity.insertMany([
    { type: 'run', durationMinutes: 35, calories: 320, date: '2026-06-26', userName: 'Noah Patel' },
    { type: 'strength', durationMinutes: 45, calories: 260, date: '2026-06-25', userName: 'Ava Chen' },
    { type: 'swim', durationMinutes: 30, calories: 280, date: '2026-06-24', userName: 'Mina Alvarez' },
  ]);

  await LeaderboardEntry.insertMany([
    { userName: 'Ava Chen', points: 248, rank: 1, streak: 8 },
    { userName: 'Mina Alvarez', points: 226, rank: 2, streak: 6 },
    { userName: 'Noah Patel', points: 210, rank: 3, streak: 5 },
  ]);

  await Workout.insertMany([
    { title: 'Power Intervals', focus: 'cardio', durationMinutes: 25, difficulty: 'intermediate', equipment: 'bike' },
    { title: 'Core Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'beginner', equipment: 'mat' },
    { title: 'Open Water Endurance', focus: 'endurance', durationMinutes: 40, difficulty: 'advanced', equipment: 'pool' },
  ]);
};
