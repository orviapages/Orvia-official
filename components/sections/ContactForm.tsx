"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  businessName: string;
  businessType: string;
  service: string;
  budget: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  businessName: "",
  businessType: "",
  service: "",
  budget: "",
  message: "",
};

const SERVICE_OPTIONS = ["START", "BUSINESS", "STORE", "No estoy seguro"];

const inputClasses =
  "w-full border border-mist bg-paper px-4 py-3.5 text-ink placeholder:text-graphite/60 transition-colors duration-200 focus:border-ink";

const labelClasses = "mb-2 block text-sm font-medium text-charcoal";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "Contanos tu nombre.";
    if (!form.email.trim()) {
      next.email = "Necesitamos tu email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Ese email no parece válido.";
    }
    if (!form.message.trim()) next.message = "Contanos brevemente qué necesitás.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "No pudimos enviar tu mensaje.");
      }

      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "No pudimos enviar tu mensaje."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-mist bg-paper p-10 text-center">
        <p className="font-display text-xl font-medium text-ink">
          ¡Gracias! Recibimos tu mensaje.
        </p>
        <p className="mt-3 text-graphite">
          Te vamos a responder a la brevedad para hablar sobre tu proyecto.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nombre *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-charcoal">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-charcoal">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="whatsapp" className={labelClasses}>
            WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="businessName" className={labelClasses}>
            Nombre del negocio
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            value={form.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="businessType" className={labelClasses}>
            Tipo de negocio
          </label>
          <input
            id="businessType"
            name="businessType"
            type="text"
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className={inputClasses}
            placeholder="Ej: barbería, restaurante, tienda..."
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClasses}>
            Servicio
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputClasses, "appearance-none bg-paper")}
          >
            <option value="">Seleccioná una opción</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className={labelClasses}>
            Presupuesto aproximado
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={inputClasses}
            placeholder="Opcional"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClasses}>
            Mensaje *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClasses, "resize-none")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-charcoal">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="border border-charcoal/30 bg-mist/40 px-4 py-3 text-sm text-charcoal">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
