import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/payment", label: "Payment" },
  { to: "/offers", label: "Offers" },
  { to: "/information", label: "Information" },
  { to: "/metrics", label: "Metrics" },
  { to: "/signin", label: "Sign in" },
  { to: "/signup", label: "Sign up" },
];

export default function AppNav() {
  const location = useLocation();

  return (
    <header className="border-b border-white/10 bg-[#0d1210]">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-300">
        <span className="mr-4 text-lime-400">FitGenie</span>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`rounded-full px-3 py-1.5 transition hover:bg-lime-400/10 hover:text-lime-400 ${
              location.pathname === to ? "bg-lime-400/15 text-lime-300" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
