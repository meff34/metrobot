"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const log_1 = require("./utils/log");
class ConfigLoader {
    constructor(pathToFile) {
        try {
            const data = fs.readFileSync(pathToFile, 'utf-8');
            this.config = JSON.parse(data);
        }
        catch (err) {
            log_1.default.runtimeError(new Error(err));
        }
    }
}
const config = (new ConfigLoader(path.join(__dirname, '../config.json'))).config;
exports.default = config;
