const koaRouter = require("koa-router");
const router = new koaRouter();
const controller = require("../controllers/cnic.controller");
const authMiddleware = require("../../middlewares/tokenChecker.middleware");
const verifyCors = require("../../middlewares/verifyCors.middleware");

router.post("/verify", async (ctx, next) => {
  const data = await controller.verify(ctx.request.body);
  ctx.status = 200;
  ctx.body = data;
  console.log(data);
});

module.exports = router;
