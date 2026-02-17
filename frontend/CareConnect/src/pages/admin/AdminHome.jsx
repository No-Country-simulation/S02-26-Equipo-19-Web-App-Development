import { Users, Activity, UsersRound, FileText } from 'lucide-react';
import Header from '../../components/layout/Header';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';

const AdminHome = () => {
    const metrics = [
        {
            id: 1,
            title: 'Total Pacientes',
            value: '4',
            icon: <Users size={24} />,
            iconBgClass: 'bg-page-admin',
            iconColorClass: 'text-white'
        },
        {
            id: 2,
            title: 'Cuidadores Activos',
            value: '4',
            icon: <Activity size={24} />,
            iconBgClass: 'bg-page-caregivers',
            iconColorClass: 'text-white'
        },
        {
            id: 3,
            title: 'Familias registradas',
            value: '4',
            icon: <UsersRound size={24} />,
            iconBgClass: 'bg-page-family',
            iconColorClass: 'text-white'
        },
        {
            id: 4,
            title: 'Informes pendientes',
            value: '4',
            icon: <FileText size={24} />,
            iconBgClass: 'bg-page-reports',
            iconColorClass: 'text-white'
        }
    ];

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col">
            {/* Header - Full Width at Top */}
            <Header rol="admin" />

            {/* Content Area with Sidebar */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar activeItem="inicio" />

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl ml-auto">
                        {metrics.map((metric) => (
                            <MetricCard
                                key={metric.id}
                                title={metric.title}
                                value={metric.value}
                                icon={metric.icon}
                                iconBgClass={metric.iconBgClass}
                                iconColorClass={metric.iconColorClass}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminHome;
