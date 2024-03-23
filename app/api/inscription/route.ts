import type { NextRequest } from "next/server";
import { createServerClient } from "@/utils";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const requestBody = await request.text(); // Lire le corps comme texte brut
  const formData = JSON.parse(requestBody); // Parser le texte brut en objet JSON

  console.log("Data:", formData);
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  const { data, error } = await supabase
    .from('seats')
    .insert([
      { ...formData } // Vos données à insérer
    ]);


  //TODO retourner ERREUR si il y a une erreur

  // Retourner une réponse avec les données au format JSON
  return new Response(JSON.stringify({ data, error }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
