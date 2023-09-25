/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");

const verifyToken = async (ctx, next) => {
  if (process.env.NODE_ENV === "localhost") return next();

  if (ctx.headers["x-access-token"]) {
    const token = ctx.headers["x-access-token"];
    if (!token) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: "Failure: No token",
        data: null,
      };
      return;
    }
    try {
      const decoded = jwt.verify(token, config.secret);
      ctx.user = decoded;
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: "Failure: Invalid token",
        data: null,
      };
      return;
    }
    return next();
  }

  ctx.status = 401;
  ctx.body = {
    success: false,
    message: "Failure: Incorrect authentication method",
    data: null,
  };
  return;
};

module.exports = verifyToken;
