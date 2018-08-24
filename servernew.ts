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

  var command = 0;

  if (req.body.Body = 'signup') {
    command = 0;

  } else if (req.body.Body = 'get') {
    var command = 1;
    } else if (req.body.Body = 'submit') {
        var command = 2;
    }
    else

        var command = 3;
    }

  switch (command) {
      case 0:

      const twiml = new MessagingResponse();
      twiml.message(/*RANDOM MESSAGE PLUCKED FROM DB*/);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());

    const client = new Client();
    await client.connect();
    let sql = 'UPDATE users SET getrequests = getrequests + 1 where phoneid = $1';
    let params = [req.body.From];
    let result = await client.query(sql, params);
    console.log('Inserted', result);


            /* What happens if a user has not signed up? -- right now thing..they'd get the
             message but not be stored -- how do we check?.. can query for that id...need a true or false return value 
             if its true we go through with the code if its false...twilio sends an error message
             
             */

    

      break;

      case 1:

      case 2:

      case 3: 



      }





    

        /* Respond to a user asking for a random pick up line */

        /* Twilio Responds to user */
        
        

       
      

    } else if {

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
    }



  
  


  /* Twilio Responds to user */
  const twiml = new MessagingResponse();
  twiml.message('Thank you for messaging The Pick Up Pen Network. Submit your game.');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});




http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});









