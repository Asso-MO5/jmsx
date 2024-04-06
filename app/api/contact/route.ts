import type { NextRequest } from "next/server";
import { createServerClient } from "@/utils";
import { cookies } from "next/headers";
import validator from "validator";
import { tables } from "@/utils/supabase/tables";
import { mailer } from "@/utils/mail";


export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const requestBody = await request.text();
  const formData = JSON.parse(requestBody); 

  const {email, text} = formData;

  if(!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }


  const isEmail = validator.isEmail(email);
  const message = validator.escape(text);

  if(!isEmail) {
    return new Response(JSON.stringify({ error: "Email is not valid" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const { error } = await supabase
    .from(tables.messages)
    .insert([
      { email, message } 
    ]);

    if(error) {
      return new Response(JSON.stringify({ error }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

   await mailer.sendMail({
    from: process.env.MAIL_USER,
    to: "JSMX ,jmsx@mo5.com",
    subject: "Nouveau message de " + email,
    text: validator.unescape(message)
  });

  return new Response('OK');
}
