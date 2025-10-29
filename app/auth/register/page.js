"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!auth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
        <div className="max-w-sm space-y-4">
          <h1 className="text-2xl font-semibold">Firebase configuration missing</h1>
          <p className="text-sm text-slate-300">
            Update your <code>.env</code> file and refresh the page to enable authentication.
          </p>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      if (form.name) {
        await updateProfile(credential.user, { displayName: form.name });
      }

      router.push("/resume");
    } catch (err) {
      const message =
        err?.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Sign-up failed. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-5%] right-[10%] h-[360px] w-[360px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[5%] h-[320px] w-[320px] rounded-full bg-sky-500/20 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row">
        <form
          onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-1 text-left">
          <h2 className="text-2xl font-semibold text-white">Create an account</h2>
          <p className="text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-sky-300 underline">
              Sign in
            </Link>
          </p>
        </div>

          <div className="mt-8 space-y-4">
            <div>
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jordan Lee"
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          />
            </div>

            <div>
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@email.com"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          />
            </div>

            <div>
          <label
            htmlFor="password"
            className="text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
              />
            </div>

            <div>
          <label
            htmlFor="confirm"
            className="text-xs uppercase tracking-[0.3em] text-slate-300"
          >
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="Re-enter your password"
            value={form.confirm}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
          />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating your account..." : "Start for free"}
        </button>
        </form>

      <div className="max-w-sm text-center md:text-left">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-300">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-white">
          A soft, premium coach for ambitious careers.
        </h1>
        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          CV Amplify is a resume studio designed with pastel gradients for the new generation.
          Set your filters, collect AI suggestions, and export a modern PDF in seconds.
        </p>
      </div>
      </div>
    </main>
  );
}
