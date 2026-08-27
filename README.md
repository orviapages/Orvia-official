# ORVIA — Sitio web oficial

Sitio web de producción para ORVIA, construido con Next.js 14 (App Router), React, TypeScript y Tailwind CSS.

## Stack

- Next.js 14 + React 18 + TypeScript
- Tailwind CSS (paleta de marca: negro `#050505`, blanco `#FFFFFF`, grises `#151515` / `#707070` / `#E8E8E8`)
- Tipografía Geist (`next/font/google`)
- Sin backend obligatorio para lanzar: el formulario de contacto usa una API route (`/api/contact`) que envía email vía [Resend](https://resend.com) si está configurado, y devuelve un error honesto si no lo está (nunca finge un envío exitoso)
- Arquitectura preparada para sumar Supabase más adelante (portfolio dinámico, `/admin`, leads en base de datos)

## Estructura

```
app/                  rutas (home, privacidad, términos, api/contact, sitemap, robots)
components/ui/        primitivos reutilizables (Button, Container, Accordion, Reveal, Logo...)
components/sections/  las secciones del home (Hero, Servicios, FAQ, etc.)
data/                 contenido editable (proyectos, servicios, FAQ, rubros, proceso)
lib/                  constantes y utilidades
types/                tipos compartidos
public/               logo procesado, favicon, ícono de app, imagen OG
```

## Cómo correr el proyecto en local

```bash
npm install
cp .env.example .env.local   # completar las variables que necesites
npm run dev
```

Abrí `http://localhost:3000`.

## Variables de entorno

Ver `.env.example`. Ninguna es obligatoria para que el sitio funcione visualmente; sin ellas:

- El botón de WhatsApp flotante simplemente no se muestra (no inventamos un número).
- El formulario de contacto devuelve un mensaje claro pidiendo configurar `RESEND_API_KEY` y `CONTACT_EMAIL_TO` en vez de fingir que el mensaje se envió.

| Variable | Para qué sirve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadata, OG, sitemap) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp en formato internacional sin signos |
| `CONTACT_EMAIL_TO` | Email que recibe los leads del formulario |
| `RESEND_API_KEY` | API key de Resend para enviar esos emails |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | Opcionales, para cuando se agregue `/admin` |

## Subir esto a GitHub

Importante: esto lo tenés que ejecutar vos — no tengo un conector de GitHub disponible en este chat para hacerlo por vos.

**Si todavía no existe el repositorio de ORVIA:**

```bash
cd orvia-web
git init
git add .
git commit -m "feat: build ORVIA official website"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/orvia-web.git
git push -u origin main
```

**Si ya existe un repositorio de ORVIA:** cloná ese repo, copiá el contenido de esta carpeta adentro (revisá si conviene reemplazar todo o mergear con lo que ya haya), y después:

```bash
git add .
git commit -m "feat: build ORVIA official website"
git push
```

## Deploy en Vercel

1. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repositorio de GitHub (si ya existe un proyecto de Vercel conectado a este repo, el deploy se dispara solo con el push anterior — no crees uno nuevo).
2. Framework: Vercel detecta Next.js automáticamente, no hace falta tocar nada.
3. Cargá las variables de entorno del `.env.example` que quieras usar en producción (Settings → Environment Variables).
4. Deploy.

## Video real en el Hero (v1.4)

Se reemplazó el mockup de navegador hecho en CSS puro por un video real (`public/video/hero-desk.mp4`, con poster `hero-desk-poster.jpg`): una persona trabajando en dos monitores, uno con código y otro con un sitio de ejemplo en el navegador. Tratamiento aplicado:

- Recortado y con zoom (no se ve el cuadro completo, foco en la pantalla del navegador)
- En blanco y negro (`grayscale`) para respetar la paleta de marca — el video original tiene luces RGB de color
- Autoplay muteado en loop, con `poster` para que no haya salto en blanco mientras carga
- Respeta `prefers-reduced-motion`: si el usuario lo tiene activado, el video se pausa en el primer frame



El proyecto **"Orvia Official"** (`cgmkhpgowkmbpmyhpqhp`) ya tiene:

- Las 5 tablas creadas (`projects`, `services`, `faq`, `testimonials`, `leads`) con Row Level Security activo y las políticas correctas (verificado).
- El contenido inicial cargado: 1 proyecto (Voltio), los 4 planes de servicios, y las 7 preguntas del FAQ.
- `.env.local` en esta misma carpeta ya tiene `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` cargados con tus valores reales — no hace falta que hagas nada para probarlo en local, solo `npm install` y `npm run dev`.

**Lo único que falta:** la `service_role` key (la vas a encontrar en tu dashboard de Supabase → Project Settings → API Keys → "secret key" / `service_role`). Sin ella el sitio funciona igual — el formulario de contacto guarda los leads usando la clave pública, que tiene permiso de inserción — pero la vas a necesitar cuando armemos `/admin` para poder leer y gestionar los leads (por diseño, la clave pública NO puede leer leads, solo insertarlos). Pegala en `.env.local` y en Vercel cuando la tengas.



Se agregó una capa de base de datos real con Supabase. El sitio la usa así:

- **Portfolio, Servicios y FAQ** (`components/sections/Portfolio.tsx`, `Services.tsx`, `Faq.tsx`) ahora son Server Components asíncronos que leen de Supabase a través de `lib/content.ts`. **Si Supabase no está configurado, siguen funcionando igual** usando los datos estáticos de `/data` como respaldo automático — nunca se rompe el sitio por falta de configuración.
- **Leads del formulario de contacto** (`/api/contact`) ahora se guardan en la tabla `leads` de Supabase, además de (u opcionalmente en vez de) enviarse por email vía Resend. Alcanza con que uno de los dos esté configurado.
- El esquema completo está en `supabase/schema.sql`: tablas `projects`, `services`, `faq`, `testimonials` y `leads`, con Row Level Security — lectura pública solo de contenido `published = true`, y los leads son de solo-escritura para la clave anónima (nadie puede leer leads sin la `service_role` key, que usa el servidor).
- El seed inicial de `schema.sql` ya carga a Voltio, los 4 planes (START/BUSINESS/STORE/CARE) y las 7 preguntas del FAQ — el mismo contenido que ya estaba en el sitio.

### Cómo activarlo

1. Entrá a tu proyecto de Supabase → **SQL Editor** → pegá el contenido completo de `supabase/schema.sql` → **Run**. Esto crea las tablas, las políticas de seguridad y carga el contenido inicial.
2. Andá a **Project Settings → API** y copiá:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (¡nunca la expongas en el frontend! solo se usa server-side)
3. Cargá esas tres variables en `.env.local` (para probar en tu máquina) y en Vercel → Settings → Environment Variables (para producción).
4. Reiniciá `npm run dev` (o hacé un nuevo deploy en Vercel). El sitio va a empezar a leer de la base de datos automáticamente.

A partir de acá, para agregar un proyecto nuevo al portfolio, cambiar un precio o sumar una pregunta al FAQ, alcanza con editar la fila correspondiente en las tablas de Supabase (Table Editor) — no hace falta tocar código ni volver a hacer deploy.



Se reemplazaron los 4 proyectos "CONCEPTO" del portfolio por 3 proyectos reales de ORVIA ya en producción: El Rey PlayStation, Voltio y De Pura Tinta (`data/projects.ts`, cada uno con su `url`). Las cards ahora enlazan al sitio real ("Ver sitio en vivo →") y muestran un badge "En producción" en vez de "Concepto". El texto de la sección de Testimonios se ajustó para reflejar que ya hay trabajo real online, aunque todavía no hay citas textuales de esos clientes.

## Actualización de diseño (v1.1)

A pedido del cliente se sumó una capa editorial más rica sobre la base minimalista original:

- **Tipografía mixta**: Geist (sans, UI y cuerpo) + Fraunces (serif itálica, para acentos de títulos, kickers numerados y el manifiesto). Se agregó el paquete `geist` porque Geist no es una Google Font — `next/font/google` no la reconoce.
- **Más movimiento**: parallax sutil en el visual del hero (`components/ui/Parallax.tsx`), marquee infinito con los rubros de negocio debajo del hero, transiciones de hover más marcadas en cards.
- **Más detalle visual**: marca de agua del búho muy sutil (`components/ui/OwlWatermark.tsx`) en Manifiesto, Diferencial y CTA final; marcas de registro tipo diseño suizo (`.corner-ticks` en `globals.css`) en el Manifiesto.
- **Más profundidad**: sombras apiladas tipo "card detrás de card" (`shadow-stack` / `shadow-stack-sm` en Tailwind) en el portfolio y en el plan destacado de precios, con efecto de "presión" al hacer hover.
- **Más contenido**: dos secciones nuevas — `Manifesto.tsx` (declaración editorial a pantalla completa) y `Comparison.tsx` (tabla honesta ORVIA vs. armarlo vos mismo vs. freelancer suelto, sin estadísticas inventadas).

Nada de esto rompe las reglas de honestidad del brief original: no se agregaron clientes, testimonios ni cifras ficticias.

## Pendiente / próximos pasos sugeridos

- Reemplazar los proyectos placeholder por más proyectos reales a medida que existan (editar `data/projects.ts`).
- Sumar testimonios reales de El Rey PlayStation, Voltio y De Pura Tinta cuando los tengas.
- Definir precio fijo para ORVIA CARE cuando esté decidido.
- Si se necesita `/admin` con login y gestión de contenido, conectar Supabase (la arquitectura de datos en `/data` está pensada para migrarse a tablas sin reescribir los componentes).

## Verificación

No pude ejecutar `npm install` / `npm run build` en este entorno porque no tiene acceso a red saliente. Revisé manualmente: todos los imports (`@/...`) resuelven a archivos existentes, los componentes con hooks/eventos tienen `"use client"`, y no quedan props o tipos inconsistentes. Aun así, corré `npm run build` y `npm run typecheck` vos antes de dar el proyecto por cerrado — es el único paso de verificación real que falta.
