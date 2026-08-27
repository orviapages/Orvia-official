-- ORVIA — esquema de base de datos para Supabase
-- Corré esto en el SQL Editor de tu proyecto de Supabase (Dashboard → SQL Editor → New query).
-- Es seguro correrlo una sola vez sobre un proyecto nuevo.

-- ============================================================
-- Extensiones necesarias
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- PROJECTS — portfolio (reemplaza a futuro data/projects.ts)
-- ============================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  is_concept boolean not null default false,
  url text,
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- SERVICES — planes START / BUSINESS / STORE / CARE
-- ============================================================
create table if not exists public.services (
  id text primary key, -- 'start' | 'business' | 'store' | 'care'
  name text not null,
  tagline text not null,
  audience text not null,
  features text[] not null default '{}',
  price text not null,
  price_note text,
  cta text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TESTIMONIALS — opiniones reales de clientes (aún sin cargar)
-- ============================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  business_name text,
  quote text not null,
  project_slug text references public.projects(slug) on delete set null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- FAQ
-- ============================================================
create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

-- ============================================================
-- LEADS — envíos del formulario de contacto
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  business_name text,
  business_type text,
  service text,
  budget text,
  message text not null,
  status text not null default 'new', -- 'new' | 'contacted' | 'won' | 'lost'
  created_at timestamptz not null default now()
);

-- ============================================================
-- updated_at automático
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at_projects on public.projects;
create trigger set_updated_at_projects
  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_services on public.services;
create trigger set_updated_at_services
  before update on public.services
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq enable row level security;
alter table public.leads enable row level security;

-- Lectura pública de contenido publicado (para la web)
create policy "public can read published projects"
  on public.projects for select
  using (published = true);

create policy "public can read published services"
  on public.services for select
  using (published = true);

create policy "public can read published testimonials"
  on public.testimonials for select
  using (published = true);

create policy "public can read published faq"
  on public.faq for select
  using (published = true);

-- Leads: cualquiera puede insertar (es el formulario público),
-- pero NADIE puede leer leads con la clave anónima — solo con la
-- service_role key desde el backend (/admin más adelante).
create policy "anyone can submit a lead"
  on public.leads for insert
  with check (true);

-- No se crean policies de select/update/delete para leads con la
-- clave anónima a propósito: por defecto, sin policy, el acceso
-- queda bloqueado. Solo la service_role key (uso exclusivo del
-- servidor) puede leer o gestionar leads.

-- ============================================================
-- Seed inicial — contenido real ya cargado en el sitio
-- ============================================================
insert into public.projects (slug, name, category, description, is_concept, url, sort_order)
values
  ('voltio', 'Voltio', 'Tienda de tecnología',
   'Tienda de gadgets y accesorios tecnológicos con catálogo por categorías y contacto directo por WhatsApp.',
   false, 'https://voltio-com-ar.vercel.app/', 1)
on conflict (slug) do nothing;

insert into public.services (id, name, tagline, audience, features, price, cta, featured, sort_order)
values
  ('start', 'ORVIA START', 'Tu primera presencia digital.', 'Para emprendedores y pequeños negocios.',
   array['Landing page','Diseño responsive','WhatsApp integrado','Formulario de contacto','SEO básico','Analytics'],
   'Desde $199.000', 'Quiero START', false, 1),
  ('business', 'ORVIA BUSINESS', 'Una web completa para tu negocio.', 'El producto principal de ORVIA.',
   array['Sitio multipágina','Diseño personalizado','Catálogo de servicios','SEO','Integraciones','Analytics','Panel de administración'],
   'Desde $399.000', 'Quiero BUSINESS', true, 2),
  ('store', 'ORVIA STORE', 'Vendé online.', 'Para negocios que necesitan una tienda.',
   array['Catálogo de productos','Carrito de compras','Checkout','Mercado Pago','Gestión de stock','WhatsApp integrado','Panel administrativo'],
   'Desde $699.000', 'Quiero STORE', false, 3),
  ('care', 'ORVIA CARE', 'Tu web, siempre funcionando.', 'Mantenimiento continuo para cualquier plan.',
   array['Hosting','Mantenimiento','Backups','Seguridad','Soporte','Cambios pequeños incluidos'],
   'Desde $XX.XXX/mes', 'Conocer CARE', false, 4)
on conflict (id) do nothing;

insert into public.faq (question, answer, sort_order)
values
  ('¿Cuánto tarda una web?', 'Depende del plan y el alcance. Una landing (START) suele estar lista en pocos días; un sitio multipágina (BUSINESS) o una tienda (STORE) puede llevar unas semanas. Definimos un plazo concreto antes de empezar.', 1),
  ('¿Necesito comprar un dominio?', 'Sí, el dominio es tuyo y se compra aparte. Te ayudamos a elegirlo y a configurarlo correctamente para que apunte a tu web.', 2),
  ('¿Puedo conectar WhatsApp?', 'Sí, todos los planes incluyen un botón de WhatsApp para que tus clientes te escriban directamente desde la web.', 3),
  ('¿Puedo vender productos?', 'Sí, con ORVIA STORE. Incluye catálogo, carrito, checkout y pagos con Mercado Pago, además de gestión de stock.', 4),
  ('¿La web funciona en celulares?', 'Sí. Todas las webs que hacemos están diseñadas primero pensando en mobile, y después adaptadas a tablet y escritorio.', 5),
  ('¿Puedo modificarla después?', 'Sí. Los planes BUSINESS y STORE incluyen panel de administración para que puedas actualizar contenido vos mismo. También podés pedirnos cambios puntuales.', 6),
  ('¿Ofrecen mantenimiento?', 'Sí, a través de ORVIA CARE: hosting, backups, seguridad, soporte y cambios pequeños para que tu web siga funcionando sin que tengas que preocuparte.', 7)
on conflict do nothing;
