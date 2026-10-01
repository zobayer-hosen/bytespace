import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { authShowcase, signupFields } from "@/data/auth";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <>
      <AuthShowcase {...authShowcase.signup} />
      <AuthPanel
        eyebrow="Create an Account"
        title={
          <>
            Welcome to
            <br />
            ByteSpace
          </>
        }
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-brand hover:underline">
              Login
            </Link>
          </>
        }
      >
        <AuthForm
          fields={signupFields}
          submitLabel="Continue"
          successMessage="Your account is ready. Welcome to ByteSpace!"
        />
      </AuthPanel>
    </>
  );
}
