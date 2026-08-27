export interface ComparisonRow {
  label: string;
  diy: string;
  freelance: string;
  orvia: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Diseño",
    diy: "Plantilla genérica, igual a miles de sitios",
    freelance: "Depende de la persona y su disponibilidad",
    orvia: "Diseño propio, pensado para tu marca",
  },
  {
    label: "Velocidad de carga",
    diy: "Cargada de scripts que no necesitás",
    freelance: "Variable según cómo esté construida",
    orvia: "Optimizada desde la arquitectura del proyecto",
  },
  {
    label: "Mobile",
    diy: "Adaptado a la fuerza, no diseñado",
    freelance: "Depende del cuidado del desarrollador",
    orvia: "Diseñado primero para mobile, siempre",
  },
  {
    label: "Soporte a futuro",
    diy: "Sos vos resolviendo tickets de soporte",
    freelance: "Puede volverse difícil de ubicar con el tiempo",
    orvia: "ORVIA CARE: mantenimiento continuo",
  },
  {
    label: "Puede crecer",
    diy: "Limitado a lo que la plantilla permite",
    freelance: "Depende de cómo se construyó el código",
    orvia: "Arquitectura preparada para crecer con vos",
  },
];
