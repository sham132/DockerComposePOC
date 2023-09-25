const axios = require('axios');
const https = require('https');
const config = require("../../configs/auth.config");
const xml2js = require('xml2js');
const util = require('util');

const parseStringPromise = util.promisify(xml2js.parseString);


class service {
  async verify(payload) {
    let data = `\r\n<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cmpa="http://cmpa.pmd.com" xmlns:xsd="http://object.pmd.com/xsd">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <cmpa:verify>\r\n         <!--Optional:-->\r\n         <cmpa:userName>${payload.userName}</cmpa:userName>\r\n         <!--Optional:-->\r\n         <cmpa:passwd>${payload.passwd}</cmpa:passwd>\r\n         <!--Optional:-->\r\n         <cmpa:request>\r\n            <!--Optional:-->\r\n            <xsd:cnic>${payload.cnic}</xsd:cnic>\r\n            <!--Optional:-->\r\n            <xsd:msisdn>${payload.msisdn}</xsd:msisdn>\r\n            <!--Optional:-->\r\n            <xsd:transactionID>${payload.transactionID}</xsd:transactionID>\r\n         </cmpa:request>\r\n      </cmpa:verify>\r\n   </`;

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://192.168.0.47:8443/CMPA/services/CnicMsisdnPairing.CnicMsisdnPairingHttpsSoap11Endpoint/',
        headers: {
            'Content-Type': 'text/html'
        },
        data: data,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    };
    console.log(data)

    const response= await axios(config)
    if(response.data){
      const result = await parseStringPromise(response.data);
      return result;
        
    }else{
        console.log("error")
    }
  }

}

module.exports = new service();
