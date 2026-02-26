import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../constants/roles";
import ForgotPassword from "../pages/login/ForgotPassword";
import ResetPassword from "../pages/login/ResetPassword";

import Login from "../pages/login/Login";

// ADMIN
import AdminHome from "../pages/admin/AdminHome";

// CAREGIVER
import Caregivers from "../pages/caregiver/Caregivers";

// PATIENT / FAMILY
import Family from "../pages/family/Family";

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminHome />
          </ProtectedRoute>
        }
      />

      {/* Caregiver */}
      <Route
        path="/caregiver"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CAREGIVER]}>
            <Caregivers />
          </ProtectedRoute>
        }
      />

      {/* Patient / Family */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <Family />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
