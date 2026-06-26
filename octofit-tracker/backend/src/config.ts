import { MONGO_URI } from './database';

export const PORT = Number(process.env.PORT || 8000);
export const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
