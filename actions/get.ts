import express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { Client } = require('pg');

export default class GetAction{

	async handleGetAction(req: express.Request, res: express.Response){
            const client = new Client();
            await client.connect();
            let sql = 'INSERT INTO users (phoneid) VALUES ($1) ON CONFLICT (phoneid) DO NOTHING';
            let params = [req.body.From];
            let result = await client.query(sql, params);

            sql = 'UPDATE users SET getrequests = getrequests + 1 where phoneid = $1';
            params = [req.body.From];
            result = await client.query(sql, params);

            sql = 'SELECT * FROM messages ORDER BY random() LIMIT 1';
            result = await client.query(sql, null);
          
            const twiml = new MessagingResponse();
            twiml.message(result);
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
	}
}
