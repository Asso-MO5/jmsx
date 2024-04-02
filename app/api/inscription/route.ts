import type { NextRequest } from "next/server";
import { createServerClient } from "@/utils";
import { cookies } from "next/headers";
import { tables } from "@/utils/supabase/tables";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const requestBody = await request.text();
  const formData = JSON.parse(requestBody); 

  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const { data, error } = await supabase
    .from(tables.seats)
    .insert([
      { ...formData } 
    ]);


  //TODO retourner ERREUR si il y a une erreur

  // Retourner une réponse avec les données au format JSON
  return new Response(JSON.stringify({ data, error }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
