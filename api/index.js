"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppFactory_1 = __importDefault(require("../src/AppFactory"));
exports.default = AppFactory_1.default.create().expressApp;
