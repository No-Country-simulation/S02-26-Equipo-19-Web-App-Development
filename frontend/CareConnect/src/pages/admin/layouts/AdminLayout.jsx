import { Outlet } from "react-router-dom";
import Header from "../../../components/layout/Header";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-bg-primary flex flex-col">
            <Header rol="admin" />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;