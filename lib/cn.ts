type ClassValue = string | number | null | boolean | undefined;

/**
 * Minimal className combiner (no external dependency needed for this project).
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
