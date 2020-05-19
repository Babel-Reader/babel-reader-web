import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const request = require('request');
const uuidv4 = require('uuid/v4');

var key_var = 'REACT_APP_TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
if (!process.env[key_var]) {
  throw new Error('Please set/export the following environment variable: ' + key_var);
}
var subscriptionKey = process.env[key_var];
var endpoint_var = 'REACT_APP_TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpoint_var]) {
  throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}
var endpoint = 'https://api.cognitive.microsofttranslator.com'//process.env[endpoint_var];

let options = {
  method: 'POST',
  baseUrl: endpoint,
  url: 'translate',
  qs: {
    'api-version': '3.0',
    'to': ['es', 'fr']
  },
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Ocp-Apim-Subscription-Region': 'canadacentral',//todo
    'Content-type': 'application/json',
    'X-ClientTraceId': uuidv4().toString()
  },
  body: [{
    'text': 'Hello World! This is a test'
  }],
  json: true,
};

console.log("A")
request(options, function(err, res, body){
  console.log("asdf")
  console.log(JSON.stringify(body, null, 4));
});

console.log("A")
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
