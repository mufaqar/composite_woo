"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import client from "@/lib/apollo-client";
import { RegisterUserInput, RegisterUserResponse } from "@/lib/gql-types";

// ✅ GraphQL mutation
const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterUserInput>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      const { data } = await client.mutate<
        RegisterUserResponse,
        RegisterUserInput
      >({
        mutation: REGISTER_USER,
        variables: form,
      });

      if (data?.registerUser?.user) {
        alert("✅ Registration successful! You can now log in.");
        router.push("/checkout");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container max-w-md mx-auto bg-background/30 md:px-11 py-12 p-6 border border-[#E4E4E4] my-10">
      <h1 className="text-2xl font-semibold text-center mb-4">Create an Account</h1> 
      <div className="space-y-6">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-secondary text-white font-semibold py-3 rounded-full hover:bg-primary transition-all"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </main>
  );
}
