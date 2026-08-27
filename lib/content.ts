import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { projects as staticProjects } from "@/data/projects";
import { services as staticServices } from "@/data/services";
import { faq as staticFaq } from "@/data/faq";
import { Project, ServicePlan, FaqItem } from "@/types/content";

/**
 * Estas funciones se usan desde Server Components (async). Si Supabase
 * está configurado, leen de la base de datos (contenido publicado,
 * ordenado). Si no está configurado, o la consulta falla, devuelven el
 * contenido estático de /data — el sitio nunca se rompe.
 */

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return staticProjects;

  const { data, error } = await supabase
    .from("projects")
    .select("slug, name, category, description, is_concept, url")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return staticProjects;

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    isConcept: row.is_concept,
    url: row.url ?? undefined,
  }));
}

export async function getServices(): Promise<ServicePlan[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return staticServices;

  const { data, error } = await supabase
    .from("services")
    .select("id, name, tagline, audience, features, price, price_note, cta, featured")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return staticServices;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    audience: row.audience,
    features: row.features ?? [],
    price: row.price,
    priceNote: row.price_note ?? undefined,
    cta: row.cta,
    featured: row.featured ?? false,
  }));
}

export async function getFaq(): Promise<FaqItem[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return staticFaq;

  const { data, error } = await supabase
    .from("faq")
    .select("question, answer")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return staticFaq;

  return data.map((row) => ({ question: row.question, answer: row.answer }));
}
