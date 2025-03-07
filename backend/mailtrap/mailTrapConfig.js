import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
dotenv.config({path:"backend/config/config.env"});


export const mailTrapclient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Authentication Coding",
};

