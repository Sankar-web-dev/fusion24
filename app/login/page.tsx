import { LoginForm } from "@/components/auth/login-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Login",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { redirectTo?: string };
}) {
  return (
    <div>
      <section className="container-px mx-auto max-w-7xl py-16 md:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="MEMBER ACCESS"
            title="Login to your dashboard."
            description="Track visits, manage your membership, and access trainer updates."
          />
        </Reveal>

        <div className="mt-10">
          <LoginForm redirectTo={searchParams?.redirectTo} />
        </div>
      </section>
    </div>
  );
}

