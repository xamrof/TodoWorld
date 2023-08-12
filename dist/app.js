"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
(() => {
    const PORT = '3001';
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    //Router
    app.use('/api/user', users_routes_1.default);
    app.use('/api/task', tasks_routes_1.default);
    app.use('/auth', auth_routes_1.default);
    //Middlewares    
    app.use(errorHandler_1.errorHandler);
    app.use('/', (req, res) => {
        res.json({ status: 'Api is running' });
    });
    app.listen(PORT || process.env.PORT, () => {
        console.log('server connected');
    });
})();
//# sourceMappingURL=app.js.map