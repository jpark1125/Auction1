const util = require("../utils");
const shortid = require("shortid");
const db = require("../models");
const client = require("../middleware/index");
class U {}

U.prototype.UserBind = (data) => {
  return {
    id: data.id,
    userid: data.userid,
    email: data.email,
    password: util.hash.generateHash(data.password),
    nickname: data.nickname,
    profile: data.profile,
    refresh_token: data.refresh_token,
  };
};

U.prototype.DuplicateData = async (target, data) => {
  try {
    const whereClause = {};
    whereClause[target] = data;

    const cnt = await db.tbl_user.count({
      where: whereClause,
    });

    return cnt == 0;
  } catch (error) {
    throw error;
  }
};

U.prototype.SignUp = async (data) => {
  try {
    await db.tbl_user.create(data);
    await client.client.set(data.id, data.refreshToken);
  } catch (err) {
    throw err;
  }
};
U.prototype.LogIn = async (u) => {
  console.log(u.userid);
  try {
    const user = await db.tbl_user.findOne({
      where: {
        userid: u.userid,
      },
    });
    if (util.hash.compareHash(u.password, user.password)) {
      let access_token = util.jwt.createToken({
        id: user.id,
        user_id: u.userid,
      });
      let refresh_token = util.jwt.createRefreshToken(user.id);
      await db.tbl_user.update(
        {
          refresh_token: refresh_token,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      client.client.set(user.id, refresh_token);
      return {
        access_token: access_token,
        refresh_token: refresh_token,
      };
    }
  } catch (err) {
    console.error(err);
  }
};
U.prototype.MyPage = async (id) => {
  try {
    const row = await db.tbl_user.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["refresh_token", "id"] },
    });
    return row;
  } catch (err) {
    console.error(err);
  }
};
U.prototype.UpdateMyPage = async (data) => {
  try {
    console.log(data);
    await db.tbl_user.update(
      {
        nickname: data.nickname,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = U;
