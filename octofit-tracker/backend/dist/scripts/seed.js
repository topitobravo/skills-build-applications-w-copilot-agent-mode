"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const models_1 = require("../models");
const runSeed = async () => {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(config_1.MONGO_URI);
    try {
        await (0, models_1.seedData)();
        console.log('Seed complete.');
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
runSeed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
