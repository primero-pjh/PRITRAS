const jwt = require("jsonwebtoken");
require("dotenv").config();
const appRoot = require('app-root-path');
const path = appRoot.path;

class JsonWebToken {
    constructor() {
        this.secretKey = process.env.JWTKEY;
    }

    Sign() {
        let token = jwt.sign(
            {
                userId: "12345"
            },
            this.secretKey,
            {
                expiresIn: "10h"
            }
        );
        console.log("token:", token);
        return token;
    }

    Verify = async (token) => {
        let decoded = null;
        try {
            let decoded = await jwt.verify(token, this.secretKey);
            return {
                success: 1,
                decoded,
            };
        } catch {
            return {
                success: 0,
            };
        }
    }
};

module.exports = JsonWebToken;