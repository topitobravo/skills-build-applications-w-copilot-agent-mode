import { Request, Response, Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const router = Router();

const registerRoute = (method: 'get' | 'post', path: string, handler: (req: Request, res: Response) => void) => {
  router[method](path, handler);
  router[method](`${path}/`, handler);
};

registerRoute('get', '/users', async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

registerRoute('post', '/users', async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

registerRoute('get', '/teams', async (_req: Request, res: Response) => {
  const teams = await Team.find();
  res.json(teams);
});

registerRoute('post', '/teams', async (req: Request, res: Response) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

registerRoute('get', '/activities', async (_req: Request, res: Response) => {
  const activities = await Activity.find();
  res.json(activities);
});

registerRoute('post', '/activities', async (req: Request, res: Response) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

registerRoute('get', '/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ points: -1 });
  res.json(leaderboard);
});

registerRoute('post', '/leaderboard', async (req: Request, res: Response) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

registerRoute('get', '/workouts', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

registerRoute('post', '/workouts', async (req: Request, res: Response) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

export default router;
