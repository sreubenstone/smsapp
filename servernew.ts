const http = require('http');
import express = require('express');
var path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
import squel = require('squel');

import GetAction from './actions/get';
import SignupAction from './actions/signup';
import SubmitAction from './actions/submit';

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
  console.log('post body', req.body);

    var body = req.body.Body;
    var isSignup = body.includes("signup");
    var isGet = body.includes("get");
    var isSubmit = body.includes("submit");

    if (isSignup) {
      var signupAction = new SignupAction();
      signupAction.handleSubmitAction(req, res);
    } else if (isGet) {
      var getAction = new GetAction();
      getAction.handleGetAction(req, res);
    } else if (isSubmit) {
      var submitAction = new SubmitAction();
      submitAction.handleSubmitAction(req, res);
    }
    else{
      const twiml = new MessagingResponse();
      twiml.message('You have inserted an invalid command. Please "SIGNUP", "GET, or "SUBMIT" to make your command valid.');
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
});


http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});









