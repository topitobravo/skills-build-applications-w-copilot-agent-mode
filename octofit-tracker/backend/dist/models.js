"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, default: 1 },
    favoriteSport: { type: String, default: 'running' },
    city: { type: String, default: 'Seattle' },
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    points: { type: Number, default: 0 },
    captain: { type: String, default: 'Lead Athlete' },
    members: { type: Number, default: 1 },
});
const activitySchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    calories: { type: Number, default: 0 },
    date: { type: String, required: true },
    userName: { type: String, default: 'Unknown' },
});
const leaderboardSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    difficulty: { type: String, default: 'beginner' },
    equipment: { type: String, default: 'bodyweight' },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
const seedData = async () => {
    const users = await exports.User.find();
    if (users.length === 0) {
        await exports.User.insertMany([
            { name: 'Ava Chen', email: 'ava.chen@example.com', level: 4, favoriteSport: 'cycling', city: 'Seattle' },
            { name: 'Noah Patel', email: 'noah.patel@example.com', level: 3, favoriteSport: 'running', city: 'Denver' },
            { name: 'Mina Alvarez', email: 'mina.alvarez@example.com', level: 5, favoriteSport: 'swimming', city: 'Austin' },
        ]);
    }
    const teams = await exports.Team.find();
    if (teams.length === 0) {
        await exports.Team.insertMany([
            { name: 'North Stars', sport: 'Cycling', points: 128, captain: 'Ava Chen', members: 6 },
            { name: 'River Runners', sport: 'Running', points: 104, captain: 'Noah Patel', members: 5 },
            { name: 'Tidal Striders', sport: 'Swimming', points: 116, captain: 'Mina Alvarez', members: 4 },
        ]);
    }
    const activities = await exports.Activity.find();
    if (activities.length === 0) {
        await exports.Activity.insertMany([
            { type: 'run', durationMinutes: 35, calories: 320, date: '2026-06-26', userName: 'Noah Patel' },
            { type: 'strength', durationMinutes: 45, calories: 260, date: '2026-06-25', userName: 'Ava Chen' },
            { type: 'swim', durationMinutes: 30, calories: 280, date: '2026-06-24', userName: 'Mina Alvarez' },
        ]);
    }
    const leaderboardEntries = await exports.LeaderboardEntry.find();
    if (leaderboardEntries.length === 0) {
        await exports.LeaderboardEntry.insertMany([
            { userName: 'Ava Chen', points: 248, rank: 1, streak: 8 },
            { userName: 'Mina Alvarez', points: 226, rank: 2, streak: 6 },
            { userName: 'Noah Patel', points: 210, rank: 3, streak: 5 },
        ]);
    }
    const workouts = await exports.Workout.find();
    if (workouts.length === 0) {
        await exports.Workout.insertMany([
            { title: 'Power Intervals', focus: 'cardio', durationMinutes: 25, difficulty: 'intermediate', equipment: 'bike' },
            { title: 'Core Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'beginner', equipment: 'mat' },
            { title: 'Open Water Endurance', focus: 'endurance', durationMinutes: 40, difficulty: 'advanced', equipment: 'pool' },
        ]);
    }
};
exports.seedData = seedData;
