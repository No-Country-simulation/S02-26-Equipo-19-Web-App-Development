import { Users, Activity, UsersRound, FileText } from 'lucide-react';
import AdminLayout from './layouts/AdminLayout';
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
        <AdminLayout activeItem="inicio">
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
        </AdminLayout>
    );
};

export default AdminHome;
