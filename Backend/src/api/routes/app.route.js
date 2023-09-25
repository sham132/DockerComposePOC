const koaRouter = require("koa-router");
const router = new koaRouter();
const authRoute = require("./auth.route");
const cnicRoute = require("./cnic.route");

router.use("/auth", authRoute.routes(), authRoute.allowedMethods());
router.use("/cnic", cnicRoute.routes(), cnicRoute.allowedMethods());

module.exports = router;
