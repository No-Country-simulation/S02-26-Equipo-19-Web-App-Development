import { useState } from "react";
import { Search } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import { useReports } from "../../hooks/useReports";
import ReportCard from "./components/ReportCard";


// ---------------------------------------------------------------------------
// AdminReports – page component
// ---------------------------------------------------------------------------
const AdminReports = () => {
    const { reports, loading, approveReport, rejectReport } = useReports();

    const [selectedFilter, setSelectedFilter] = useState("Todos");
    const [searchQuery, setSearchQuery] = useState("");

    const filters = ["Todos", "Pendientes", "Aprobados", "Rechazados"];

    // -----------------------------------------------------------------
    // Derived list: filter by status pill + search input (client-side UX)
    // -----------------------------------------------------------------
    const filteredReports = reports.filter((r) => {
        const filterMap = {
            Todos: true,
            Pendientes: r.status === "pending",
            Aprobados: r.status === "approved",
            Rechazados: r.status === "rejected",
        };
        const matchesFilter = filterMap[selectedFilter] ?? true;

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            !query ||
            r.caregiver.toLowerCase().includes(query) ||
            r.patient.toLowerCase().includes(query) ||
            r.type.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });

    // Counters for filter pills
    const counts = {
        Todos: reports.length,
        Pendientes: reports.filter((r) => r.status === "pending").length,
        Aprobados: reports.filter((r) => r.status === "approved").length,
        Rechazados: reports.filter((r) => r.status === "rejected").length,
    };

    // -----------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------
    return (
        <div className="max-w-6xl ml-auto mr-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-semibold text-f-primary">Reportes</h1>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Filter Pills */}
                <div className="flex gap-2 flex-wrap">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${selectedFilter === filter
                                ? "bg-white text-f-primary shadow-sm border border-gray-200"
                                : "bg-transparent text-f-secondary hover:text-f-primary hover:bg-gray-100"
                                }`}
                        >
                            {filter}
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs ${selectedFilter === filter
                                ? "bg-page-admin text-white"
                                : "bg-gray-200 text-f-secondary"
                                }`}>
                                {counts[filter]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar reporte..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin text-sm w-56"
                    />
                </div>
            </div>

            {/* Loading */}
            {loading && <LoadingSpinner message="Cargando reportes..." />}

            {/* Empty State */}
            {!loading && filteredReports.length === 0 && (
                <EmptyState message="No se encontraron reportes." />
            )}

            {/* Report Cards */}
            {!loading && filteredReports.length > 0 && (
                <div>
                    {filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            onApprove={approveReport}
                            onReject={rejectReport}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminReports;