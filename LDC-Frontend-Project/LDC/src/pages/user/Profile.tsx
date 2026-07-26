import { Link, useNavigate } from "react-router-dom";
import { LogOut, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import AnnouncementBar from "../../components/Header/AnnouncementBar";
import BreadCrumb from "../../components/BreadCrumb";
import { useToast } from "../../components/ui/ToastProvider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectUser } from "../../store/slices/authslice";
import { clearCart } from "../../store/slices/cartslice";
import { clearToken } from "../../utils/auth";

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-neutral-200 py-4 last:border-b-0">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <p className="mt-0.5 break-words text-base text-[var(--brand)]">
          {value?.trim() ? value : "—"}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const user = useAppSelector(selectUser);

  function handleLogout() {
    clearToken();
    dispatch(logout());
    dispatch(clearCart());
    toast({ message: "Signed out" });
    navigate("/login", { replace: true });
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <BreadCrumb
        items={[{ label: "Home", href: "/Home" }, { label: "Profile" }]}
      />

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-[32px] font-bold text-black sm:mb-8 sm:text-[40px]">
          My profile
        </h1>

        {!user ? (
          <div className="flex flex-col items-center gap-6 rounded-[20px] border border-neutral-200 bg-white px-6 py-16 text-center">
            <p className="text-lg text-neutral-500">
              You are not signed in.
            </p>
            <Link
              to="/login"
              className="inline-flex h-14 items-center justify-center rounded-full bg-black px-8 text-base font-medium text-white transition hover:opacity-90"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <div className="rounded-[20px] border border-neutral-200 bg-white p-5 sm:p-8">
            {/* Identity */}
            <div className="flex items-center gap-4 pb-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-2xl font-bold text-white">
                {user.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-bold text-[var(--brand)]">
                  {user.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {user.status}
                  </span>
                  {user.isAdmin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-semibold text-violet-600">
                      <ShieldCheck size={12} />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-neutral-200" />

            {/* Details */}
            <div className="mt-2">
              <DetailRow
                icon={<User size={16} />}
                label="Full name"
                value={user.name}
              />
              <DetailRow
                icon={<Mail size={16} />}
                label="Email"
                value={user.email}
              />
              <DetailRow
                icon={<Phone size={16} />}
                label="Phone"
                value={user.phone}
              />
              <DetailRow
                icon={<MapPin size={16} />}
                label="Address"
                value={user.address}
              />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {user.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--brand)] px-6 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Go to dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-red-200 px-6 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
