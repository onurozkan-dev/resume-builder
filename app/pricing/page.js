"use client";

import Link from "next/link";

const plans = [
  {
    name: "Spark",
    price: "₺129",
    period: "per month",
    tagline: "Perfect for your first professional resume refreshes.",
    highlights: ["10 AI suggestions / month", "Soft PDF templates", "Filter bundle: Starter"],
    badge: "Most popular",
  },
  {
    name: "Glow",
    price: "₺219",
    period: "per month",
    tagline: "Premium studio experience for emerging professionals.",
    highlights: [
      "Unlimited AI boosting",
      "Exclusive pastel theme packs",
      "Filter bundle: Pro",
      "Notion & Figma export",
    ],
    badge: "Recommended",
    featured: true,
  },
  {
    name: "Aura",
    price: "₺329",
    period: "per month",
    tagline: "Career coaching plus collaborative team support.",
    highlights: [
      "Dedicated career editor",
      "5 seats for your team",
      "Filter bundle: Elite",
      "Monthly coaching sessions",
    ],
    badge: "For teams",
  },
];

const faqs = [
  {
    question: "Do you offer a free plan?",
    answer:
      "Yes! Try the Spark plan free for 7 days when you create an account and explore every filter.",
  },
  {
    question: "Can I cancel my plan any time?",
    answer:
      "Absolutely. Manage billing inside membership settings to cancel or upgrade in one click.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "Visa, Mastercard, Amex, and iyzico infrastructure let you pay upfront or in instalments.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[15%] top-[-10%] h-[360px] w-[360px] rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute right-[10%] bottom-[-15%] h-[320px] w-[320px] rounded-full bg-sky-500/20 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16">
        <header className="text-center">
          <Link href="/" className="text-slate-300 underline">
            ← Back to home
          </Link>
          <h1 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
            Soft, premium resume studio plans
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
            Join the next-gen SaaS experience. Curate filters, unlock AI insights, and export
            modern PDFs to elevate your career.
          </p>
        </header>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[2.2rem] border border-white/10 bg-white/[0.08] p-8 backdrop-blur-xl transition hover:-translate-y-1 ${
                plan.featured ? "shadow-lg shadow-violet-500/30" : ""
              }`}
            >
              {plan.badge && (
                <span className="absolute left-8 top-6 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                  {plan.badge}
                </span>
              )}

              <div className="mt-10">
                <h2 className="text-3xl font-semibold text-white">{plan.name}</h2>
                <p className="mt-4 text-sm text-slate-300">{plan.tagline}</p>
                <p className="mt-6 text-4xl font-semibold text-white">
                  {plan.price}
                  <span className="text-sm font-light text-slate-300"> {plan.period}</span>
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                {plan.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/register"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-slate-900 hover:-translate-y-0.5"
                    : "border border-white/20 text-white hover:border-white/40"
                }`}
              >
                Choose plan
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-6 rounded-[2.5rem] border border-white/10 bg-white/[0.08] p-8 backdrop-blur-xl md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Frequently asked questions</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Quick answers about membership live here. Need more? Catch us on live chat any time.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 transition hover:border-white/30"
              >
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-sky-500/30 via-violet-500/20 to-purple-500/30 p-10 text-center backdrop-blur-xl">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Give your rising career a boutique touch.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-100/80">
            CV Amplify is a cloud-native resume studio with pastel gradients, micro-interactions,
            and AI integration to make you shine on every job board.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-white/20 transition hover:-translate-y-0.5"
            >
              Try for free
            </Link>
            <Link
              href="/resume"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Explore the studio
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
