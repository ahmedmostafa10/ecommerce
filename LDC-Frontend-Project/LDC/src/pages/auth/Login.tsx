import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/ui/InputField";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: call the backend login endpoint
    console.log("login", form);
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            id="remember"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          <a
            href="#"
            className="text-sm font-medium text-[var(--neutral-900)] hover:text-indigo-600"
          >
            Forgot your password?
          </a>
        </div>
        <Button type="submit">Sign In</Button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-500 hover:text-indigo-600"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
