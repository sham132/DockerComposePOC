/* eslint-disable no-undef */
const allowedOrigins = require("../configs/allowedOrigin");

const verifyCors = async (ctx, next) => {
  const referer = ctx.request.header.referer;

  console.log("-------------------------------------------------");
  console.log("referer", referer);
  console.log("allowedOrigins", allowedOrigins);
  console.log("-------------------------------------------------");

  if (
    process.env.NODE_ENV_PRIVATE_IP &&
    process.env.NODE_ENV !== "production"
  ) {
    return next();
  }

  if (!referer || allowedOrigins.indexOf(referer) === -1) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: "Failure: Request not allowed",
      data: null,
    };
    return;
  }

  return next();
};

module.exports = verifyCors;
