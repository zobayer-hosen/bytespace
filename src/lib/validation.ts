import type { AuthField, FieldRules } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

/** Returns the first failing rule's message for a field, or undefined when it is valid. */
export function validateField(label: string, value: string, rules: FieldRules) {
  const trimmed = value.trim();
  if (rules.required && !trimmed) return `${label} is required.`;
  if (rules.email && !isValidEmail(trimmed)) return "Enter a valid email address.";
  if (rules.minLength && value.length < rules.minLength) {
    return `${label} must be at least ${rules.minLength} characters.`;
  }
  return undefined;
}

/** Validates every field in `data`, returning an error message per invalid field name. */
export function validateFields(fields: readonly AuthField[], data: FormData) {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const error = validateField(field.label, String(data.get(field.name) ?? ""), field.rules);
    if (error) errors[field.name] = error;
  }
  return errors;
}
