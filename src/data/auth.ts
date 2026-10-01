import { MIN_PASSWORD_LENGTH } from "@/lib/validation";
import type { AuthField } from "@/types";

const emailField: AuthField = {
  name: "email",
  label: "Email",
  type: "email",
  placeholder: "designer@example.com",
  autoComplete: "email",
  rules: { required: true, email: true },
};

function passwordField(autoComplete: "new-password" | "current-password"): AuthField {
  return {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete,
    rules: { required: true, minLength: MIN_PASSWORD_LENGTH },
  };
}

export const signupFields: AuthField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Jamie Davis",
    autoComplete: "name",
    rules: { required: true },
  },
  emailField,
  passwordField("new-password"),
];

export const loginFields: AuthField[] = [emailField, passwordField("current-password")];

export const authShowcase = {
  signup: {
    title: "Sign up and come in",
    description:
      "The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost!",
  },
  login: {
    title: "Sign in with ease",
    description:
      "Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.",
  },
};
