"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
let Input: FC<InputHTMLAttributes<HTMLInputElement>>;
let Button: FC<ButtonHTMLAttributes<HTMLButtonElement>>;
try {
  Input = require("@/components/ui/input").Input;
  Button = require("@/components/ui/button").Button;
} catch {
  Input = (props: any) => (
    <input {...props} className="border-2 border-pink-300 rounded-full px-4 py-3 w-full text-lg focus:outline-none focus:ring-4 focus:ring-yellow-200 bg-yellow-50 placeholder:text-pink-400 font-semibold transition-all" />
  );
  Button = (props: any) => (
    <button
      {...props}
      className="bg-pink-400 hover:bg-pink-500 text-white rounded-full px-8 py-3 w-full text-lg font-extrabold shadow-lg transition-all"
    />
  );
}

const mascotSVG = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="40" fill="#FFD93B"/>
    <ellipse cx="40" cy="55" rx="22" ry="10" fill="#F4B400"/>
    <ellipse cx="28" cy="38" rx="5" ry="7" fill="#fff"/>
    <ellipse cx="52" cy="38" rx="5" ry="7" fill="#fff"/>
    <ellipse cx="28" cy="38" rx="2.5" ry="3.5" fill="#222"/>
    <ellipse cx="52" cy="38" rx="2.5" ry="3.5" fill="#222"/>
    <path d="M32 52 Q40 60 48 52" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <rect x="34" y="18" width="12" height="8" rx="4" fill="#F4B400"/>
    <rect x="34" y="18" width="12" height="4" rx="2" fill="#FFD93B"/>
  </svg>
);

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
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8 flex flex-col items-center border-4 border-yellow-200"
      >
        <div className="mb-2 animate-bounce">{mascotSVG}</div>
        <h1 className="text-3xl font-extrabold text-pink-600 drop-shadow-lg text-center mb-2">Teacher Login</h1>
        <p className="text-lg text-blue-700 font-semibold text-center mb-4">Welcome! Please sign in to start teaching road safety.</p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          required
        />
        {error && (
          <div className="text-red-500 text-sm text-center font-bold bg-red-100 rounded-full px-4 py-2">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account?{" "}
          <a href="/teacher/signup" className="text-blue-600 hover:underline font-bold">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
}
