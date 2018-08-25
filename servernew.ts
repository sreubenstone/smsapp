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

    var command = 0;

        if (isSignup) {
              command = 0;

        } else if (isGet) {
              command = 1;

        } else if (isSubmit) {
               command = 2;
        }
        else
        
            command = 3;
    }


  switch (command) {
      case 0: /* SIGN UP*/

          const twiml = new MessagingResponse();
          twiml.message('You now have an account with The Network, congratulations.');
          res.writeHead(200, {'Content-Type': 'text/xml'});
          res.end(twiml.toString());

          const client = new Client();
          await client.connect();
          let sql = 'INSERT INTO users (phoneid) VALUES ($1) ON CONFLICT (phoneid) DO NOTHING';
          let params = [req.body.From];
          let result = await client.query(sql, params);
          console.log('Inserted', result);
    
        break;


     case 1:  /* SUBMIT*/

      const twiml = new MessagingResponse();
      twiml.message('You have succesfully inserted your pick up line to the network.');
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());

      const client = new Client();
      await client.connect();
      let sql = 'INSERT INTO users (phoneid) VALUES ($1) ON CONFLICT (phoneid) DO NOTHING';
      let params = [req.body.From];
      let result = await client.query(sql, params);

      sql = 'INSERT INTO messages (userid, message) VALUES ($1, $2)';
      params = [req.body.From, req.body.Body];
      result = await client.query(sql, params);
      console.log('Inserted', result);
      console.log('Inserted', result);

        break;


      case 2:/* GET*/

      const client = new Client();
      await client.connect();
      let sql = 'INSERT INTO users (phoneid) VALUES ($1) ON CONFLICT (phoneid) DO NOTHING';
      let params = [req.body.From];
      let result = await client.query(sql, params);

      sql = 'UPDATE users SET getrequests = getrequests + 1 where phoneid = $1';
      params = [req.body.From];
      result = await client.query(sql, params);

      sql = 'SELECT * FROM messages ORDER BY random() LIMIT 1';
      params = null;
      result = await client.query(sql, params)

    
      const twiml = new MessagingResponse();
      twiml.message(result);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
            


      case 3:  /* ERROR -- Invalid Command */

      const twiml = new MessagingResponse();
      twiml.message('You have inserted an invalid command. Please "SIGNUP", "GET, or "SUBMIT" to make your command valid.');
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());

      }


    }

});


http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});









