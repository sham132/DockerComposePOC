const { Model } = require("objection");

const databaseCredentialArray = require("../configs/database.config");
const connectDatabase = require("../database/connectDatabase");
let connected = false;

const databaseManager = async (ctx, next) => {
  if (!connected) {
    for await (const iterator of databaseCredentialArray) {
      const response = await connectDatabase(iterator);

      console.log("--------------------------------------");
      console.log("database", {
        client: iterator.client,
        host: iterator.connection.host,
        port: iterator.connection.port,
      });
      console.log("response", {
        success: response?.success,
        message: response?.message,
      });
      console.log("--------------------------------------");

      if (response?.success) {
        connected = true;
        Model.knex(response?.database);
        await next();
        return;
      }
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      message: "Failure: Database not connected",
      data: null,
    };

    console.log("--------------------------------------");
    console.log(ctx.body);
    console.log("--------------------------------------");
  }

  await next();
};

module.exports = databaseManager;
