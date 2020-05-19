const request = require('request');
const uuidv4 = require('uuid/v4');

const key_var = 'REACT_APP_TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
if (!process.env[key_var]) {
  throw new Error('Please set/export the following environment variable: ' + key_var);
}
const subscriptionKey = process.env[key_var];
const endpoint_var = 'REACT_APP_TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpoint_var]) {
  throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}
const endpoint = 'https://api.cognitive.microsofttranslator.com'//process.env[endpoint_var];

const defaultOptions = {
  method: 'POST',
  baseUrl: endpoint,
  url: 'translate',
  qs: {
    'api-version': '3.0',
  },
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Ocp-Apim-Subscription-Region': 'canadacentral',//todo
    'Content-type': 'application/json',
    'X-ClientTraceId': uuidv4().toString()
  },
  body: [{
  }],
  json: true,
};


export default (text, callback)=>{
  const languages = ['es', 'fr'];
  const options = {...defaultOptions};
  options.qs['to'] = languages;
  options.body[0] = {text: text}


  return request(options, callback);


}
