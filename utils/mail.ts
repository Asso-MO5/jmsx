import * as  nodemailer from "nodemailer";

const config = {
  host: process.env.MAIL_HOST,  
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as any

export const mailer = nodemailer.createTransport(config);