"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const log_1 = require("./utils/log");
class ConfigLoader {
    constructor(path) {
        try {
            const data = fs.readFileSync(path, 'utf-8');
            this.config = JSON.parse(data);
        }
        catch (err) {
            this.handleReadFileError(err);
        }
    }
    handleReadFileError(error) {
        log_1.default.runtimeError(error);
    }
}
const config = (new ConfigLoader(path.resolve(__dirname, '../config.json'))).config;
exports.default = config;
