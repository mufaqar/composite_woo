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
    <main className="container mx-auto px-4 md:px-12 py-10">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>

      <div className="max-w-md bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="bg-secondary text-white px-6 py-2 rounded-md w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </main>
  );
}
