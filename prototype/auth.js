const util = require("../utils");
const db = require("../models");

class A {}

A.prototype.GetHeaderToken = (header) => {
  try {
    let decoded = util.jwt.verifyToken(header.authorization);
    if (decoded.id == undefined) {
      throw new Error("token is undefined");
    }
    return {
      id: decoded.id,
      user_id: decoded.user_id,
    };
  } catch (error) {
    if (error.toString().includes("TokenExpiredError")) {
      return { expired: true };
    }
    throw error;
  }
};

A.prototype.GetHeaderRefreshToken = (header) => {
  try {
    let decoded = util.jwt.verifyToken(header.authorization);
    if (decoded.id == undefined) {
      throw new Error("token is undefined");
    }
    return {
      id: decoded.id,
    };
  } catch (error) {
    if (error.toString().includes("TokenExpiredError")) {
      return { expired: true };
    }
    throw error;
  }
};

A.prototype.IssuedToken = async (token) => {
  try {
    let rows = await db.tbl_user.findOne({
      where: {
        id: token.id,
        refresh_token: token.refresh_token,
      },
    });
    if (rows.id == undefined) {
      throw new Error("id is not exist");
    }
    return {
      access_token: util.jwt.createToken({ id: rows.id, user_id: rows.userid }),
    };
  } catch (error) {
    throw error;
  }
};

A.prototype.AutoIssuedToken = async (token) => {
  try {
    let rows = await db.tbl_user.findOne({
      where: {
        id: token.id,
        refresh_token: token.refresh_token,
      },
    });
    let reply = {};
    reply.access_token = util.jwt.createToken({
      id: rows.id,
      user_id: rows.userid,
    });
    reply.refresh_token = util.jwt.createRefreshToken(rows.id);
    console.log(reply.access_token);
    console.log(reply.refresh_token);

    let a = await db.tbl_user.update(
      {
        refresh_token: reply.refresh_token,
      },
      {
        where: {
          id: token.id,
        },
      }
    );
    console.log(a);

    console.log("reply", reply);
    return reply;
  } catch (error) {
    throw error;
  }
};
module.exports = A;
