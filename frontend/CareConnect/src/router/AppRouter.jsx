import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../constants/roles";
import Login from "../pages/login/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import CaregiverDashboard from "../pages/caregiver/Dashboard";
import PatientDashboard from "../pages/patient/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Caregiver */}
      <Route
        path="/caregiver/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CAREGIVER]}>
            <CaregiverDashboard />
          </ProtectedRoute>
        }
      />

      {/* Patient */}
      <Route
        path="/patient/*"
        element={
          <ProtectedRoute allowedRoles={[ROLES.PATIENT]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
