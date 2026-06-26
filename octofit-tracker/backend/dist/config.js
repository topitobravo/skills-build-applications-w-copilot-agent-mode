"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseUrl = exports.PORT = void 0;
exports.PORT = Number(process.env.PORT || 8000);
exports.baseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
