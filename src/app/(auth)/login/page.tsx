import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { AuthPanel } from "@/components/auth/AuthPanel";
import { AuthShowcase } from "@/components/auth/AuthShowcase";
import { SocialSignIn } from "@/components/auth/SocialSignIn";
import { authShowcase, loginFields } from "@/data/auth";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <>
      <AuthShowcase {...authShowcase.login} />
      <AuthPanel
        eyebrow="Sign In"
        title="Welcome Back"
        footer={
          <>
            New user?{" "}
            <Link href="/signup" className="text-brand hover:underline">
              Create an account
            </Link>
          </>
        }
      >
        <AuthForm fields={loginFields} submitLabel="Sign In" successMessage="Signed in. Welcome back!" />
        <SocialSignIn />
      </AuthPanel>
    </>
  );
}
