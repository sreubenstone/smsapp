const http = require('http');
const express = require('express');
var path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');
var pg = require('pg');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/sms', (req, res) => {

  var msgFrom = req.body.From;

  const twiml = new MessagingResponse();

  twiml.message('Thank you for messaging The Pick Up Pen Network. Please submit a pick up line by typing submit then the pick up line or type get to receive a random pick up line tip. or ');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

/* DB Work */

var connect = "postgres://crossover:password@locahost/pendb"

pg.connect
