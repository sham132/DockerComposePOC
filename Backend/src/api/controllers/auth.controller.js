const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");

class controller {
  async login(payload) {
    const schema = joi.object().keys({
      username: joi.string().required(),
      password: joi.string().required(),
    });

    const foundError = schema.validate(payload).error;
    if (foundError) {
      return {
        success: false,
        message: `Invalid payload: ${foundError.message}`,
        data: null,
      };
    }

    try {
      const { username,password } = payload;

      
      if (username==config.username && password==config.password) {
        const token = jwt.sign({ id: config.username }, config.secret, {
          expiresIn: config.jwtExpiration,
        });
        return {
          success: true,
          message: `LoginSuccessfull`,
          data: {username,password,token},
        }
      }else{
        return {
          success: false,
          message: `invalid username and password`,
          data: null,
        };
      }
      
    } catch (error) {
      console.log("error", error);
      return {
        success: false,
        message: `Catch Error: Failed to login.`,
        data: null,
      };
    }
  }

 
}

module.exports = new controller();
