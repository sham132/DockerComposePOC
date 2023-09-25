const koaRouter = require("koa-router");
const router = new koaRouter();
const controller = require("../controllers/auth.controller");
const authMiddleware = require("../../middlewares/tokenChecker.middleware");
const verifyCors = require("../../middlewares/verifyCors.middleware");

router.post("/login", async (ctx, next) => {
  const data = await controller.login(ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  console.log(data);
});

module.exports = router;
