import Link from "next/link";

const stats = [
  { label: "Active users", value: "12K+" },
  { label: "AI-crafted lines", value: "480K" },
  { label: "Career uplift", value: "87%" },
];

const perks = [
  {
    title: "Boutique design system",
    description:
      "Soft pastel gradients and micro-interactions build a premium experience for young talent.",
  },
  {
    title: "AI-powered suggestions",
    description:
      "Let intelligent prompts analyse your experience and polish every line in seconds.",
  },
  {
    title: "Live filter engine",
    description:
      "Personalise outputs with tone, skill, and industry filters that put you in the spotlight.",
  },
];

const workflow = [
  {
    title: "Create your profile",
    copy: "Sign in within minutes through Firebase-backed membership and get your workspace.",
  },
  {
    title: "Amplify your resume",
    copy: "Refresh sections with filters and AI suggestions while you fine-tune the tone.",
  },
  {
    title: "Share as PDF",
    copy: "Export premium-looking PDFs with a single tap and stay presentation-ready.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/30 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[380px] w-[380px] rounded-full bg-sky-500/25 blur-[150px]" />
        <div className="absolute top-[45%] right-[30%] h-40 w-40 rounded-full border border-white/5" />
      </div>

      <header className="sticky top-0 backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg font-semibold">
              CV
            </span>
            <div className="leading-tight">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
                Lume
              </p>
              <p className="text-xl font-semibold">CV Amplify</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-10 text-sm text-slate-300 md:flex">
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/resume" className="hover:text-white transition-colors">
              Resume Studio
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10 md:block"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:shadow-violet-500/40"
            >
              Start for free
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 pb-20 pt-24 text-center md:flex-row md:text-left">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
            For Emerging Professionals
          </span>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            Elevate your resume with{" "}
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
              next-gen SaaS magic
            </span>{" "}
            at your fingertips.
          </h1>
          <p className="text-base text-slate-300 md:text-lg">
            CV Amplify is crafted to spotlight your experience with modern design, AI guidance,
            and adaptive filters. Effortless storytelling, premium visuals, instant sharing.
          </p>

          <div className="flex flex-col items-center gap-3 md:flex-row">
            <Link
              href="/resume"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-white/20 transition hover:-translate-y-0.5"
            >
              Enter the studio
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Explore pricing
            </Link>
          </div>

          <dl className="grid gap-6 text-left sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex-1">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-1 shadow-2xl">
            <div className="rounded-[1.35rem] bg-slate-950/80 p-8 backdrop-blur">
              <p className="text-left text-xs uppercase tracking-[0.4em] text-slate-400">
                Live Preview
              </p>
              <h2 className="mt-3 text-left text-2xl font-semibold text-white">
                CV Amplify Studio
              </h2>
              <p className="mt-2 text-left text-sm text-slate-300">
                Choose your skills, tune the tone, and craft a standout resume in minutes with AI.
              </p>
              <div className="mt-6 grid gap-3 text-left text-sm text-slate-200">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Tone
                  </p>
                  <p className="mt-1 font-semibold">Dynamic & Creative</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Focus
                  </p>
                  <p className="mt-1 font-semibold">
                    Striking outcomes in front-end product design
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Output
                  </p>
                  <p className="mt-1 font-semibold leading-relaxed text-slate-200/90">
                    Deliver a minimalist, punchy resume that spotlights award-winning work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-6xl space-y-10 px-6 pb-24 md:space-y-12"
      >
        <div className="flex flex-col gap-6 text-center md:text-left">
          <span className="self-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300 md:self-start">
            What we offer
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Modules built to give your resume a boutique edge.
          </h2>
          <p className="text-base text-slate-300 md:max-w-2xl">
            We keep emerging professionals front and centre with a gender-inclusive, refined,
            and easy-on-the-eyes design system optimised for hiring platforms.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {perks.map((perk) => (
            <article
              key={perk.title}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-white/30"
            >
              <h3 className="text-xl font-semibold text-white">{perk.title}</h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {perk.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 md:p-14">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            <div className="md:w-1/2 space-y-6">
              <span className="inline-flex rounded-full border border-white/20 bg-slate-900/70 px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                Flow
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Streamline your modern career journey.
              </h2>
              <p className="text-base text-slate-300">
                Fine-tune filters inside your personal membership hub, manage every detail with
                live preview, and share polished outputs instantly.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Create account
              </Link>
            </div>
            <ol className="grid gap-6 md:w-1/2">
              {workflow.map((item, index) => (
                <li
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CV Amplify. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-white transition">
              Pricing
            </Link>
            <Link href="/auth/login" className="hover:text-white transition">
              Access account
            </Link>
            <Link href="/resume" className="hover:text-white transition">
              Resume Studio
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
