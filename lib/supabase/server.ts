import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

/**
 * Cliente de Supabase para usar SOLO en el servidor (API routes, Server
 * Components), con la service_role key. Salta RLS por completo — nunca
 * importar este archivo desde un componente de cliente.
 *
 * Devuelve null si las variables de entorno no están configuradas.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  if (!serverClient) {
    serverClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return serverClient;
}
