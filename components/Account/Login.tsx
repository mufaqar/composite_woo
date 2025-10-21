"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace("/graphql", "");
      const res = await fetch(`${apiBase}/wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        const user = {
          email: data.user_email,
          name: data.user_display_name,
        };

        // ✅ Save to localStorage manually (Redux does this too)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`✅ Welcome back, ${user.name}!`);
        router.refresh(); // refresh state so Redux picks up
      } else {
        setError(data.message || "Invalid username or password.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // ✅ Redirect or show different view
  if (user) {
    return (
      <main className="container mx-auto px-4 md:px-12 py-10">
        <div className="max-w-md mx-auto bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4] text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome back!</h1>
          <p className="mb-2 text-title">You’re logged in as:</p>
          <p className="font-semibold mb-4">{user.name}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:bg-secondary transition-all"
            >
              Go to Checkout
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white rounded-full px-6 py-3 font-bold hover:bg-primary transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container max-w-md mx-auto bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4] mb-10">
      <h1 className="text-2xl font-semibold text-center mb-4">Login to Your Account</h1>
      <div className="space-y-6">
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-secondary text-white font-semibold py-3 rounded-full hover:bg-primary transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </main>
  );
}
