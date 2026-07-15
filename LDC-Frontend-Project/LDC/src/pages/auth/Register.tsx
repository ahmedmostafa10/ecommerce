import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call the backend register endpoint
    console.log("register", form);
  };

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Full name"
          id="name"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          id="address"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <InputField
          label="Phone number"
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          value={form.phone}
          onChange={handleChange}
        />
        <InputField
          label="E-mail"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <InputField
          label="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-500 hover:text-indigo-600"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
