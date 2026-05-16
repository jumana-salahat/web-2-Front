import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppNav from "./components/layout/AppNav";
import Home from "./pages/Home";
import PaymentMethods from "./pages/PaymentMethods";
import OffersPage from "./pages/OffersPage";
import InformationUsers from "./pages/InformationUsers";
import MetricsDashboard from "./pages/MetricsDashboard";
import PlanPlaceholder from "./pages/PlanPlaceholder";
import AuthLayout from "./pages/auth/AuthLayout";

import AdminDashboard from "./components/admin/AdminDashboard.jsx";
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));

function AuthSuspense({ children }) {
  return (
    <Suspense fallback={<div className="p-6 text-center text-sm text-gray-400">Loading…</div>}>
      {children}
    </Suspense>
  );
}

function Shell({ children }) {
  return (
    <>
      <AppNav />
      {children}
    </>
  );
}

function AdminGuard({ children }) {
  const isAdmin = true;
  return isAdmin ? children : <div>Not allowed</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <Shell>
              <Home />
            </Shell>
          }
        />

        <Route
          path="/payment"
          element={
            <Shell>
              <PaymentMethods />
            </Shell>
          }
        />

        <Route
          path="/offers"
          element={
            <Shell>
              <OffersPage />
            </Shell>
          }
        />

        <Route
          path="/information"
          element={
            <Shell>
              <InformationUsers />
            </Shell>
          }
        />

        <Route
          path="/metrics"
          element={
            <Shell>
              <MetricsDashboard />
            </Shell>
          }
        />

        <Route
          path="/plan"
          element={
            <Shell>
              <PlanPlaceholder />
            </Shell>
          }
        />

        {/* ===== ADMIN ROUTE (NEW) ===== */}
        <Route
          path="/admin"
          element={
            <Shell>
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            </Shell>
          }
        />

        {/* ===== AUTH ROUTES ===== */}
        <Route element={<AuthLayout />}>
          <Route
            path="/signin"
            element={
              <AuthSuspense>
                <SignIn />
              </AuthSuspense>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthSuspense>
                <SignUp />
              </AuthSuspense>
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}