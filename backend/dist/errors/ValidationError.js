"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const ApiError_1 = require("./ApiError");
class ValidationError extends ApiError_1.ApiError {
    constructor(message) {
        super(400, message);
    }
}
exports.ValidationError = ValidationError;
