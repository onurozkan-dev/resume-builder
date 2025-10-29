"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

const googleProvider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/resume");
    } catch (err) {
      setError(
        err?.message === "Firebase: Error (auth/invalid-credential)."
          ? "Email or password is incorrect."
          : "Sign-in failed. Check your details and try again."
      );
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/resume");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] h-[360px] w-[360px] rounded-full bg-violet-600/25 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[320px] w-[320px] rounded-full bg-sky-500/25 blur-[150px]" />
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col-reverse items-center gap-12 md:flex-row md:items-start">
        <div className="max-w-sm text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-300">
            ← Back to home
          </Link>
          <h1 className="mt-6 text-4xl font-semibold text-white">
            Welcome back, the spotlight is yours.
          </h1>
          <p className="mt-4 text-sm text-slate-300 leading-relaxed">
            Sign in to CV Amplify and keep building your resume with AI-powered tools. A soft,
            premium dashboard is ready for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-1 text-left">
            <h2 className="text-2xl font-semibold text-white">Sign in</h2>
            <p className="text-sm text-slate-300">
              New here?{" "}
              <Link href="/auth/register" className="text-sky-300 underline">
                Create a free account
              </Link>
            </p>
          </div>

          <div className="mt-8 space-y-4">
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
                className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                required
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
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40"
                required
                minLength={6}
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
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-slate-200"
          >
            <path d="M12.545 10.262v3.511h5.827c-.236 1.498-1.757 4.39-5.827 4.39-3.507 0-6.366-2.897-6.366-6.466s2.859-6.466 6.366-6.466c1.996 0 3.335.849 4.099 1.582l2.787-2.645C17.69 2.56 15.332 1.5 12.545 1.5 6.95 1.5 2.4 6.085 2.4 11.697c0 5.613 4.55 10.198 10.145 10.198 5.873 0 9.775-4.135 9.775-9.957 0-.669-.073-1.18-.163-1.676H12.545z" />
          </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}
