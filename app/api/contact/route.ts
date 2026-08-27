import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface ContactPayload {
  name: string;
  email: string;
  whatsapp?: string;
  businessName?: string;
  businessType?: string;
  service?: string;
  budget?: string;
  message: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmailTo = process.env.CONTACT_EMAIL_TO;
  // Preferimos la service_role key (bypassa RLS, uso admin). Si todavía no
  // está configurada, usamos la clave pública: la tabla leads tiene una
  // policy que permite insertar a cualquiera, así que igual funciona.
  const supabase = getSupabaseServerClient() ?? getSupabaseBrowserClient();

  // Si no hay ni base de datos ni email configurados, lo decimos con
  // honestidad en lugar de simular un envío exitoso.
  if (!supabase && (!resendApiKey || !contactEmailTo)) {
    console.warn(
      "[ORVIA] Lead recibido pero no guardado en ningún lado: falta configurar Supabase y/o RESEND_API_KEY + CONTACT_EMAIL_TO.",
      { name, email }
    );
    return NextResponse.json(
      {
        error:
          "El formulario todavía no está conectado a ningún destino. Configurá Supabase (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) y/o RESEND_API_KEY + CONTACT_EMAIL_TO en las variables de entorno.",
      },
      { status: 503 }
    );
  }

  let savedToDb = false;
  let sentByEmail = false;

  // 1. Guardar el lead en Supabase, si está configurado.
  if (supabase) {
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      whatsapp: body.whatsapp || null,
      business_name: body.businessName || null,
      business_type: body.businessType || null,
      service: body.service || null,
      budget: body.budget || null,
      message,
    });

    if (dbError) {
      console.error("[ORVIA] Error guardando lead en Supabase:", dbError);
    } else {
      savedToDb = true;
    }
  }

  // 2. Enviar el email de aviso, si está configurado.
  if (resendApiKey && contactEmailTo) {
    try {
      const emailBody = [
        `Nombre: ${name}`,
        `Email: ${email}`,
        body.whatsapp ? `WhatsApp: ${body.whatsapp}` : null,
        body.businessName ? `Negocio: ${body.businessName}` : null,
        body.businessType ? `Tipo de negocio: ${body.businessType}` : null,
        body.service ? `Servicio de interés: ${body.service}` : null,
        body.budget ? `Presupuesto: ${body.budget}` : null,
        "",
        "Mensaje:",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ORVIA <onboarding@resend.dev>",
          to: contactEmailTo,
          reply_to: email,
          subject: `Nuevo lead — ${name}${body.businessName ? ` (${body.businessName})` : ""}`,
          text: emailBody,
        }),
      });

      if (res.ok) {
        sentByEmail = true;
      } else {
        const errData = await res.json().catch(() => null);
        console.error("[ORVIA] Error enviando email via Resend:", errData);
      }
    } catch (err) {
      console.error("[ORVIA] Error inesperado enviando email:", err);
    }
  }

  // Éxito si al menos uno de los dos destinos funcionó.
  if (savedToDb || sentByEmail) {
    return NextResponse.json({ ok: true, savedToDb, sentByEmail });
  }

  return NextResponse.json(
    { error: "No pudimos guardar tu mensaje. Probá de nuevo en unos minutos." },
    { status: 502 }
  );
}
