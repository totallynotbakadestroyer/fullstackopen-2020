"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/api/ping", (_req, res) => {
    res.json({ answer: "pong" });
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});
