"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const userAuth = (req, res, next) => {
    if (req.decode.role === 'user') {
        next();
    }
    else {
        res.status(401).send('Unauthorized');
    }
};
exports.userAuth = userAuth;
//# sourceMappingURL=userAuth.js.map