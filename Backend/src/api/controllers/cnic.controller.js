const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");
const service= require("../services/cnic.service.js")

class controller {
  async verify(payload) {
    const schema = joi.object().keys({
      userName: joi.string().optional(),
      passwd: joi.string().optional(),
      cnic: joi.string().required(),
      msisdn: joi.string().required(),
      transactionID: joi.string().required(),

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
      const data=await service.verify(payload)
      console.log(JSON.stringify(data))
      if(data){

        var d = new Date();


        // timestamp:new Date().toISOString().replace('T',' ').split(".")[0],
        const nsReturn = data['soapenv:Envelope']['soapenv:Body'][0]['ns:verifyResponse'][0]['ns:return'][0]['ax21:message'][0];
        return { timestamp:d.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }), transactionID : payload.transactionID, cnic : payload.cnic , msisdn : payload.msisdn  , data:nsReturn }
      }else{
        return { message: 'failed', data:data }
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
