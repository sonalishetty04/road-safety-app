"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import type { FC, InputHTMLAttributes, ButtonHTMLAttributes } from "react";
import Image from "next/image";

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

export default function TeacherSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/teacher/login"), 1500);
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
          <h1 className="text-3xl font-extrabold text-yellow-900 drop-shadow-lg text-center mb-6">Teacher Sign Up</h1>
          <p className="text-lg text-yellow-800 font-semibold text-center mb-6">Create your account to start teaching road safety!</p>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-yellow-800 mb-1">Email</label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-yellow-800 mb-1">Password</label>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center font-bold bg-red-100 rounded-full px-4 py-2">{error}</div>
            )}
            {success && <div className="text-green-600 text-sm text-center font-bold bg-green-100 rounded-full px-4 py-2">Sign up successful! Redirecting to login...</div>}
            <Button type="submit">Sign Up</Button>
          </form>
          <div className="text-center text-sm mt-4">
            Already have an account? <a href="/teacher/login" className="text-orange-600 hover:underline font-bold">Login</a>
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