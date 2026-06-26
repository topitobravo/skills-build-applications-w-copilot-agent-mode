import { MONGO_URI } from './config/database';

export const PORT = Number(process.env.PORT || 8000);
export const Url = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
