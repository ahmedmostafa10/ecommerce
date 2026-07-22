import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/CustomButton";
import { register } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const { data: user } = await register({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", JSON.stringify(user.token));
      navigate("/Home");
    } catch (err) {
      setError(
        (isAxiosError(err) && err.response?.data?.message) ||
          "Registration failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
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
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Sign Up"}
        </Button>
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
