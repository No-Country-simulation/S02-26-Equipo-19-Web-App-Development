import { Users, Activity, UsersRound, FileText, CreditCard, CheckCircle } from 'lucide-react';
import AdminLayout from './layouts/AdminLayout';
import MetricCard from './components/MetricCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useAdminMetrics } from '../../hooks/useAdminMetrics';

/**
 * AdminHome – Dashboard page for admin role.
 * Only renders; all data logic lives in useAdminMetrics.
 */
const AdminHome = () => {
    const { metrics, loading } = useAdminMetrics();

    return (
        <>
            {loading && <LoadingSpinner message="Cargando métricas..." size="lg" />}

            {!loading && !metrics && (
                <EmptyState message="No se pudieron cargar las métricas" />
            )}

            {!loading && metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl ml-auto">
                    <MetricCard
                        title="Cuidadores activos"
                        value={metrics.totalCaregivers}
                        icon={<Activity size={24} />}
                        iconBgClass="bg-page-caregivers"
                        iconColorClass="text-white"
                    />
                    <MetricCard
                        title="Total Pacientes"
                        value={metrics.totalPatients}
                        icon={<Users size={24} />}
                        iconBgClass="bg-page-admin"
                        iconColorClass="text-white"
                    />
                    <MetricCard
                        title="Familias registradas"
                        value={metrics.totalFamilies}
                        icon={<UsersRound size={24} />}
                        iconBgClass="bg-page-family"
                        iconColorClass="text-white"
                    />
                    <MetricCard
                        title="Informes pendientes"
                        value={metrics.pendingReports}
                        icon={<FileText size={24} />}
                        iconBgClass="bg-page-reports"
                        iconColorClass="text-white"
                    />
                    <MetricCard
                        title="Pagos pendientes"
                        value={metrics.pendingPayments}
                        icon={<CreditCard size={24} />}
                        iconBgClass="bg-yellow-500"
                        iconColorClass="text-white"
                    />
                    <MetricCard
                        title="Pagos completados"
                        value={metrics.completedPayments}
                        icon={<CheckCircle size={24} />}
                        iconBgClass="bg-green-500"
                        iconColorClass="text-white"
                    />
                </div>
            )}
        </>
    );
};

export default AdminHome;
