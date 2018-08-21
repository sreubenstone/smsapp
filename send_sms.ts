// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC4f4a47682dd13eee8b49aa22c3538fe4';
const authToken = 'bfc9ff64caca3c90a9e58b786316e5c8';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Was good homie homie',
     from: '+19292425545',
     to: '+15164265510'
   })
  .then(message => console.log(message.sid))
  .done();
