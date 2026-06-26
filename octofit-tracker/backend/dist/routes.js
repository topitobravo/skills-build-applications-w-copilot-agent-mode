"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
const registerRoute = (method, path, handler) => {
    router[method](path, handler);
    router[method](`${path}/`, handler);
};
registerRoute('get', '/users', async (_req, res) => {
    const users = await models_1.User.find();
    res.json(users);
});
registerRoute('post', '/users', async (req, res) => {
    const user = await models_1.User.create(req.body);
    res.status(201).json(user);
});
registerRoute('get', '/teams', async (_req, res) => {
    const teams = await models_1.Team.find();
    res.json(teams);
});
registerRoute('post', '/teams', async (req, res) => {
    const team = await models_1.Team.create(req.body);
    res.status(201).json(team);
});
registerRoute('get', '/activities', async (_req, res) => {
    const activities = await models_1.Activity.find();
    res.json(activities);
});
registerRoute('post', '/activities', async (req, res) => {
    const activity = await models_1.Activity.create(req.body);
    res.status(201).json(activity);
});
registerRoute('get', '/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort({ points: -1 });
    res.json(leaderboard);
});
registerRoute('post', '/leaderboard', async (req, res) => {
    const entry = await models_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
registerRoute('get', '/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find();
    res.json(workouts);
});
registerRoute('post', '/workouts', async (req, res) => {
    const workout = await models_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
