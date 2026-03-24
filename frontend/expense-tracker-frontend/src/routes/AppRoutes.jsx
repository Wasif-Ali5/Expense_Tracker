import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "../components/PrivateRoute";

const Login = lazy(() => import("../pages/Auth/Login.jsx"));
const Signup = lazy(() => import("../pages/Auth/Signup.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard.jsx"));
const AddTransaction = lazy(() => import("../pages/Transaction/AddTransaction.jsx"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTransaction />
              </PrivateRoute>
            }
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;