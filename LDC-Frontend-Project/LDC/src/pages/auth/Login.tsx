import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/ui/InputField";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/CustomButton";
import { login } from "../../services/auth";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/slices/authslice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    setSubmitting(true);
    try {
      const { data: user } = await login({
        email: form.email,
        password: form.password,
      });
      if (form.remember) {
        localStorage.setItem("token", JSON.stringify(user.token));
      } else {
        sessionStorage.setItem("token", JSON.stringify(user.token));
      }
      dispatch(setUser(user));
      navigate("/Home");
    } catch (err) {
      setError(
        (isAxiosError(err) && err.response?.data?.message) ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setSubmitting(false);
    }
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
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
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
