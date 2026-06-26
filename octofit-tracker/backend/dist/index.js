"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running', baseUrl: config_1.baseUrl });
});
const startServer = async () => {
    await mongoose_1.default.connect(config_1.MONGO_URI);
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
