export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  isConcept: boolean;
  url?: string;
}

export interface ServicePlan {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  features: string[];
  price: string;
  priceNote?: string;
  cta: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BusinessCategory {
  name: string;
  image: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}
