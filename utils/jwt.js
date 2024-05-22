const jwt = require("jsonwebtoken");
let ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY;

module.exports = {
    Init: (ACCESS_KEY, REFRESH_KEY,) => {
        ACCESS_TOKEN_KEY = ACCESS_KEY
        REFRESH_TOKEN_KEY = REFRESH_KEY
        return
    },

    createToken: (payload) => {
        console.log("payload :", payload)
        console.log(111)
        const token = jwt.sign(
            {
                id: payload.id,
                user_id: payload.user_id,
            },
            ACCESS_TOKEN_KEY,
            {
                algorithm: "HS256",
                expiresIn: "10m",
            }
        );
        return token;
    },
  
    createRefreshToken: (id) => {
        console.log("REFRESH_TOKEN_KEY : ",REFRESH_TOKEN_KEY)
        const token = jwt.sign(
            {
                id: id,
            },
            REFRESH_TOKEN_KEY,
            {
                algorithm: "HS256",
                expiresIn: "7d",
            }
        );
        return token;
    },

    verifyToken: (token) => {
        if (!token) {
            return "";
        }
        let decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
        return decoded;
    },

    verifyRefreshToken: (token) => {
        if (!token) {
            return "";
        }
        let decoded = jwt.verify(token, REFRESH_TOKEN_KEY);
        return decoded;
    },
};