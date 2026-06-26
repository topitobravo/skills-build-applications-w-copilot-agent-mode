"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const database_1 = require("./database");
const routes_1 = __importDefault(require("./routes"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl: config_1.baseUrl });
});
const startServer = async () => {
    await (0, database_1.connectToDatabase)();
    await (0, models_1.seedData)();
    app.listen(config_1.PORT, () => {
        console.log(`Server listening on port ${config_1.PORT}`);
        console.log(`API base URL: ${config_1.baseUrl}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
