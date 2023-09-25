

const koa = require("koa");
const cors = require("@koa/cors");
const koaLogger = require("koa-logger");
const koaBody = require("koa-bodyparser");
const koaHelmet = require("koa-helmet");
const app = new koa();
const https = require("https");
const fs = require("fs");
const { default: enforceHttps } = require("koa-sslify");
const path = require("path");
// const serve = require("koa-static");
const http = require("http");

// const db = require("./src/database/db");
const errorMiddleware = require("./src/middlewares/error.middleware");
const router = require("./src/api/routes/app.route");
// const corsOption = require("./src/configs/corsOption");
//const databaseManager = require("./src/middlewares/databaseManager.middleware");

const httpPort = process.env.NODE_ENV === "private" ? 6005 : 3002;
const httpsPort = process.env.NODE_ENV === "private" ? 6006 : 3001;

app
  // .use(serve("."))
//  .use(databaseManager)
  .use(errorMiddleware())
  .use(koaHelmet())
  .use(koaLogger())
  .use(koaBody({ jsonLimit: "100mb", formLimit: "100mb", textLimit: "100mb" }))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(
    enforceHttps({
      port: httpsPort,
    })
  );

const sslServer = {
  key: fs.readFileSync(path.join(__dirname, "ssl-cert", "cmpa.key")),
  cert: fs.readFileSync(path.join(__dirname, "ssl-cert", "certificate.crt")),
 
};
// const sslServer = {
//   key: fs.readFileSync(path.join(__dirname, "ssl-cert", "cmpa.key")),
//   cert: fs.readFileSync(path.join(__dirname, "ssl-cert", "certificate.crt")),
//   ca: [
//     fs.readFileSync(path.join(__dirname, "ssl-cert", "DigiCertCA.crt")),
//     fs.readFileSync(path.join(__dirname, "ssl-cert", "TrustedRoot.crt")),
//   ],
// };




http
  .createServer(app.callback())
  .listen(httpPort, () => console.log(`Http started on ${httpPort}`));

https
  .createServer(sslServer, app.callback())
  .listen(httpsPort, () => console.log(`Https started on ${httpsPort}`));
