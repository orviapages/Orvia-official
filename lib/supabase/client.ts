import { createClient, SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Cliente de Supabase para el navegador (clave anónima, respeta RLS).
 * Devuelve null si las variables de entorno no están configuradas,
 * para que el sitio siga funcionando con los datos estáticos de /data
 * mientras Supabase no esté conectado.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) return null;

  if (!browserClient) {
    browserClient = createClient(url, anonKey);
  }

  return browserClient;
}
