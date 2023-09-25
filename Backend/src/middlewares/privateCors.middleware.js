const allowedOriginPrivate = require("../configs/allowedOriginPrivate");

const privateCors = async (ctx, next) => {
  const referer = ctx.request.header.referer;

  console.log("-------------------------------------------------");
  console.log("referer", referer);
  console.log("allowedOrigins", allowedOriginPrivate);
  // console.log("ctx", ctx);
  console.log("-------------------------------------------------");

  // if (!referer || allowedOriginPrivate.indexOf(referer) === -1) {
  //   ctx.status = 400;
  //   ctx.body = {
  //     success: false,
  //     message: "Failure: Request not allowed",
  //     data: null,
  //   };
  //   return;
  // }

  return next();
};

module.exports = privateCors;
