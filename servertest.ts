const http = require('http');
import express = require('express');
var path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
import squel = require('squel');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', async (req, res) => {
  console.log('post body', req.body);

    var signup = req.body.Body;
    var isSignup = submit.includes("signup");

    var get = req.body.Body;
    var isGet = submit.includes("get");

    var submit = req.body.Body;
    var isSubmit = submit.includes("submit");

    let dog = 0;

        if (isSignup) {
              dog = 0;
              

        } else if (isGet) {
              dog = 1;
              

        } else if (isSubmit) {
               dog = 2;
               
        }
        else
        
            dog = 3;

            
    }

);



http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});









