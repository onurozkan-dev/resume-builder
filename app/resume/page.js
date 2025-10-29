"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { useAuth } from "@/components/AuthProvider";

const toneOptions = [
  { id: "energetic", label: "Dynamic", description: "Startup energy with uplifting language" },
  { id: "elegant", label: "Elegant", description: "Premium tone tailored to luxury brands" },
  { id: "confident", label: "Confident", description: "Crisp corporate voice with clarity" },
];

const focusOptions = [
  {
    id: "product",
    label: "Product Design",
    description: "Highlights UI/UX, experience, and user impact",
  },
  {
    id: "engineering",
    label: "Engineering",
    description: "Emphasises technical depth and success metrics",
  },
  {
    id: "leadership",
    label: "Leadership",
    description: "Spotlights team building and growth narratives",
  },
];

const highlightOptions = [
  { id: "skills", label: "Skill Boost", description: "Spotlight your signature skill set" },
  { id: "impact", label: "Impact Story", description: "Tell measurable achievement stories" },
  { id: "persona", label: "Creative Persona", description: "Project your personal brand tone" },
];

export default function ResumePage() {
  const router = useRouter();
  const { user, loading: authLoading, authEnabled } = useAuth();
  const isDemoMode = !authEnabled;
  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [filters, setFilters] = useState({
    tone: toneOptions[0].id,
    focus: focusOptions[0].id,
    highlight: highlightOptions[1].id,
  });
  const [aiResult, setAiResult] = useState("");
  const [structured, setStructured] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentTone = toneOptions.find((option) => option.id === filters.tone);
  const currentFocus = focusOptions.find((option) => option.id === filters.focus);
  const currentHighlight = highlightOptions.find(
    (option) => option.id === filters.highlight
  );

  useEffect(() => {
    if (!authEnabled || authLoading) return;
    if (!user) {
      router.push("/auth/login");
    }
  }, [authEnabled, authLoading, user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const skillsList = useMemo(
    () =>
      form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [form.skills]
  );

  const filterNarrative = useMemo(() => {
    return `Tone: ${currentTone?.label || "-"} • Focus: ${currentFocus?.label || "-"} • Highlight: ${
      currentHighlight?.label || "-"
    }`;
  }, [currentTone, currentFocus, currentHighlight]);

  const handleAIImprove = async () => {
    setLoading(true);
    setStructured(null);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, filters }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.improved) {
        setAiResult(data.improved);
      } else {
        setAiResult("No response received from the AI service.");
      }

      if (data.structured) {
        setStructured(data.structured);
      }
    } catch (err) {
      setLoading(false);
      setAiResult("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const baseContent = aiResult
      ? aiResult
      : `
Tone: ${currentTone?.label || ""}
Focus: ${currentFocus?.label || ""}
Highlight: ${currentHighlight?.label || ""}

Full Name: ${form.fullName}
Headline: ${form.headline}
Summary: ${form.summary}
Skills: ${form.skills}
Experience: ${form.experience}
Education: ${form.education}
`;

    const lines = doc.splitTextToSize(baseContent, 180);
    doc.text(lines, 15, 20);
    doc.save("resume.pdf");
  };

  const handleFilterSelect = (group, value) => {
    setFilters((prev) => ({ ...prev, [group]: value }));
  };

  const handleSignOut = async () => {
    if (!authEnabled || !auth) return;
    await signOut(auth);
    router.push("/");
  };

  if (authEnabled && authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-slate-300">Preparing the studio...</p>
        </div>
      </main>
    );
  }

  if (authEnabled && !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[380px] w-[380px] rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[0] h-[320px] w-[320px] rounded-full bg-sky-500/20 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <header className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
              CV Amplify Studio
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Welcome to a soft & premium resume studio.
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Choose your tone with filters, tap into AI guidance, and keep every layout fresh,
              modern, and powerful.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <span className="rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-xs font-medium text-slate-200">
              {authEnabled ? user?.email : "Demo mode • Firebase disabled"}
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40"
              >
                View plans
              </Link>
              {authEnabled ? (
                <button
                  onClick={handleSignOut}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:-translate-y-0.5"
                >
                  Go to sign-in
                </Link>
              )}
            </div>
          </div>
        </header>

        {isDemoMode && (
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.06] p-4 text-sm text-slate-200 backdrop-blur-xl">
            You are running in demo mode. Add your Firebase keys to the .env file to enable
            authentication and membership features.
          </div>
        )}

        <section className="mt-10 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Filter studio
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Define the tone, focus, and highlights of your resume. AI suggestions will adapt
                to these selections.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    Ton
                  </p>
                  <div className="mt-3 grid gap-2">
                    {toneOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleFilterSelect("tone", option.id)}
                        className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition ${
                          filters.tone === option.id
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-sm font-semibold">{option.label}</span>
                        <span className="text-xs text-slate-300/80">{option.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    Odak
                  </p>
                  <div className="mt-3 grid gap-2">
                    {focusOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleFilterSelect("focus", option.id)}
                        className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition ${
                          filters.focus === option.id
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-sm font-semibold">{option.label}</span>
                        <span className="text-xs text-slate-300/80">{option.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    Vurgu
                  </p>
                  <div className="mt-3 grid gap-2">
                    {highlightOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleFilterSelect("highlight", option.id)}
                        className={`flex w-full flex-col rounded-2xl border px-4 py-3 text-left transition ${
                          filters.highlight === option.id
                            ? "border-white/60 bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                        }`}
                      >
                        <span className="text-sm font-semibold">{option.label}</span>
                        <span className="text-xs text-slate-300/80">{option.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                Filter summary
              </p>
              <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                {filterNarrative}
              </p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                Resume content panel
              </h2>
              <div className="mt-5 grid gap-4">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
                <input
                  name="headline"
                  value={form.headline}
                  onChange={handleChange}
                  placeholder="Headline / Role"
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  placeholder="Short professional summary"
                  rows={3}
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
                <input
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Experience"
                  rows={4}
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
                <textarea
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="Education"
                  rows={3}
                  className="w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAIImprove}
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "AI is thinking..." : "Boost with AI"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  PDF indir
                </button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]">
              <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Live preview
                </h3>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white px-6 py-6 text-slate-900">
                  <header>
                    <h4 className="text-2xl font-semibold">
                      {form.fullName || "Full name"}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {form.headline || "Role / Title"}
                    </p>
                  </header>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                    Selected configuration
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {filterNarrative}
                  </p>

                  <div className="mt-5 space-y-4 text-sm text-slate-700">
                    <section>
                      <h5 className="font-semibold text-slate-900">Summary</h5>
                      <p className="mt-1 whitespace-pre-wrap">
                        {form.summary || "A concise professional summary will appear here."}
                      </p>
                    </section>

                    <section>
                      <h5 className="font-semibold text-slate-900">Skills</h5>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {skillsList.length ? (
                          skillsList.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            Example: React, Next.js, UI Systems
                          </p>
                        )}
                      </div>
                    </section>

                    <section>
                      <h5 className="font-semibold text-slate-900">Experience</h5>
                      <pre className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                        {form.experience || "Company • Role • Dates\n- Bullet 1\n- Bullet 2"}
                      </pre>
                    </section>

                    <section>
                      <h5 className="font-semibold text-slate-900">Education</h5>
                      <pre className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                        {form.education || "School • Major • Graduation year"}
                      </pre>
                    </section>
                  </div>
                </div>
              </article>

              <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                  AI guidance
                </h3>
                {aiResult ? (
                  <div className="mt-4 space-y-5">
                    <div className="rounded-2xl border border-white/15 bg-slate-950/60 px-5 py-5 text-sm text-slate-200">
                      <p className="whitespace-pre-wrap">{aiResult}</p>
                    </div>

                    {structured && (
                      <div className="rounded-2xl border border-white/15 bg-slate-950/40 px-5 py-5 text-sm text-slate-200">
                        <h4 className="text-base font-semibold text-white">
                          Structured suggestion
                        </h4>
                        <p className="mt-2 text-slate-300">{structured.summary}</p>
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-semibold text-white">Skills</h5>
                          <div className="flex flex-wrap gap-2">
                            {structured.skills?.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-white/15 px-3 py-1 text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-semibold text-white">Experience</h5>
                          <ul className="space-y-1 text-slate-200/80">
                            {structured.experience?.map((line) => (
                              <li key={line}>• {line}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-4 space-y-2">
                          <h5 className="text-sm font-semibold text-white">Education</h5>
                          <ul className="space-y-1 text-slate-200/80">
                            {structured.education?.map((line) => (
                              <li key={line}>• {line}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center">
                    <p className="text-sm text-slate-300">
                      Pick your filters and add content. Then hit the Boost with AI button to
                      receive a tailored suggestion.
                    </p>
                  </div>
                )}
              </article>
            </div>
          </section>
        </section>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} CV Amplify. Crafted with design & technology.</p>
          <Link href="/" className="text-slate-300 underline">
            Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
