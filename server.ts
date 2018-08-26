const http = require('http');
import express = require('express');
var path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/sms', async (req, res) => {
  console.log('post body', req.body);

  const client = new Client();
  await client.connect();
  let sql = 'INSERT INTO users (phoneid) VALUES ($1) ON CONFLICT (phoneid) DO NOTHING';
  let params = [req.body.From];
  let result = await client.query(sql, params);
  console.log('Inserted', result);


  sql = 'INSERT INTO messages (userid, message) VALUES ($1, $2)';
  params = [req.body.From, req.body.Body];
  result = await client.query(sql, params);
  console.log('Inserted', result);



  /* Twilio Responds to user */
  const twiml = new MessagingResponse();

  twiml.message('Thank you for messaging us. ');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});









