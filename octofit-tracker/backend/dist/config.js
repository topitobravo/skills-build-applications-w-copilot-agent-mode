"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.MONGO_URI = exports.PORT = void 0;
exports.PORT = Number(process.env.PORT || 8000);
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
exports.baseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
