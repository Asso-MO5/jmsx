import type { NextRequest } from "next/server";
import { createServerClient } from "@/utils";
import { cookies } from "next/headers";
import validator from "validator";
import { tables } from "@/utils/supabase/tables";
import { v4 as uuidv4 } from "uuid";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const requestBody = await request.text();
  const formData = JSON.parse(requestBody);

  const { email } = formData;

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const isEmail = validator.isEmail(email);

  if (!isEmail) {
    return new Response(JSON.stringify({ error: "Email is not valid" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  fetch(process.env.DISCORD_HOOK || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `**Nouvel inscrit** à la newsletter\n\n**Email**: ${email}\n`,
    }),
  });

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const { error } = await supabase
    .from(tables.newsletter)
    .insert([{ email, isValid: false, token: uuidv4() }]);

  if (error) {
    return new Response(JSON.stringify({ error }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response("OK");
}
