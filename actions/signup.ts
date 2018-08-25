import express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { Client } = require('pg');

export default class SubmitAction{
	async handleSubmitAction(req: express.Request, res: express.Response){
   
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
	}
}
