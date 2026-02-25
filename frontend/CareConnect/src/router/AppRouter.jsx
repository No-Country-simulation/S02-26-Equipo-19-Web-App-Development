import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../pages/admin/layouts/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminCaregivers from "../pages/admin/AdminCaregivers";

import Home from "../pages/home/Home";
import Family from "../pages/family/Family";
import Caregivers from "../pages/caregiver/Caregivers";
import AdminReports from "../pages/admin/AdminReports";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/family" element={<Family />} />
                <Route path="/caregivers" element={<Caregivers />} />

                {/* Admin routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminHome />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="patients" element={<AdminPatients />} />
                    <Route path="caregivers" element={<AdminCaregivers />} />
                    <Route path="reports" element={<AdminReports />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;