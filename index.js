import 'dotenv/config';

import express from 'express';

import twilio from 'twilio';
import ngrok from 'ngrok';
const app = express();

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;


app.get('/token/:identity', (req, res) => {
    const identity = req.params.identity;
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
    );
  
    token.identity = identity;
    token.addGrant(
      new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
      }),
    );
  
    res.send({
      identity: token.identity,
      jwt: token.toJwt(),
    });
  });
  
  app.listen(process.env.PORT, function () {
    console.log(`Programmable Chat server running on port ${process.env.PORT}`);
  });
  ngrok.connect(process.env.PORT).then((url) => {
    console.log(`Server forwarded to public url ${url}`);
  });