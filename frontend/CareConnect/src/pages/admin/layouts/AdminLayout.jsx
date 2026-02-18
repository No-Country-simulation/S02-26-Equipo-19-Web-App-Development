import Header from '../../../components/layout/Header';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children, activeItem }) => {
    return (
        <div className="min-h-screen bg-bg-primary flex flex-col">
            {/* Header - Full Width at Top */}
            <Header rol="admin" />

            {/* Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar activeItem={activeItem} />

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
