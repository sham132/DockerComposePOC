const axios = require('axios');
const https = require('https');
let data = JSON.stringify({
  "userName": "test",
  "passwd": "pmd668test_123",
  "cnic": "3740587386690",
  "msisdn": "3428687871",
  "transactionID": "12347"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3002/cnic/verify',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data,
  data: data,

};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
