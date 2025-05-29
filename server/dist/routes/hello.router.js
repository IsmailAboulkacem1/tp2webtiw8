"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// simple GET /hello/ → renvoie un JSON
router.get('/', (_req, res) => {
    res.json({ message: 'Hello from your API!' });
});
exports.default = router;
