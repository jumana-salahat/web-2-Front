import { Outlet } from "react-router-dom";
import AppNav from "../../components/layout/AppNav";
import "./auth-shell.css";

export default function AuthLayout() {
  return (
    <div className="fitgenie-auth-shell">
      <AppNav />
      <Outlet />
    </div>
  );
}
