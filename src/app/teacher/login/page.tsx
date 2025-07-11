"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
// import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import Image from "next/image";

// Remove require/try/catch and Input/Button components
// Use styled <input> and <button> directly in the form

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/teacher/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6ee] py-12 px-4">
      <div className="bg-amber-50 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-3xl overflow-hidden border-2 border-orange-100">
        {/* Mascot Section - now on the left */}
        <div className="hidden md:flex items-center justify-center bg-amber-50 p-8">
          <Image src="/mascot-left.png" alt="Mascot" width={280} height={280} className="w-72 h-72 object-contain" />
        </div>
        {/* Form Section */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-yellow-900 drop-shadow-lg text-center mb-6">Teacher Login</h1>
          <p className="text-lg text-yellow-800 font-semibold text-center mb-6">Welcome! Please sign in to start teaching road safety.</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-yellow-800 mb-1">Email</label>
              <input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-400 bg-white text-gray-800 shadow-sm outline-none transition mb-0" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-yellow-800 mb-1">Password</label>
              <input id="password" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-orange-400 bg-white text-gray-800 shadow-sm outline-none transition mb-0" />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center font-bold bg-red-100 rounded-full px-4 py-2">{error}</div>
            )}
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow transition" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account? <a href="/teacher/signup" className="text-orange-600 hover:underline font-bold">Sign up</a>
          </div>
        </div>
      </div>
      {/* On mobile, show mascot above form */}
      <div className="flex md:hidden items-center justify-center mb-6">
        <Image src="/mascot-left.png" alt="Mascot" width={160} height={160} className="w-40 h-40 object-contain" />
      </div>
    </div>
  );
}
