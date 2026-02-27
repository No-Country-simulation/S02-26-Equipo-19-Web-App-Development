import { useState } from 'react';
import { Plus, Search, Edit2, Ban, CreditCard } from 'lucide-react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useCaregivers } from '../../hooks/useCaregivers';

/**
 * AdminCaregivers – Admin view for managing caregivers.
 *
 * Responsibilities:
 *  - Render the caregivers list via the Table component.
 *  - Show LoadingSpinner while data is being fetched.
 *  - Show EmptyState if the list is empty.
 *  - Delegate all async logic to useCaregivers.
 *
 * Does NOT:
 *  - Call the service directly.
 *  - Manipulate caregiver arrays.
 *  - Contain any async logic.
 */
const AdminCaregivers = () => {
    // ── Server state via hook ──────────────────────────────────────────────
    const {
        caregivers,
        loading,
        createCaregiver,
        updateCaregiver,
        deactivateCaregiver,
    } = useCaregivers();

    // ── Local UI state ─────────────────────────────────────────────────────
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['Todos', 'Activos', 'Inactivos'];

    // ── Action handlers – delegate to hook, no inline async ───────────────
    const handleCreate = () => {
        // TODO: open create modal, then call createCaregiver(formData)
        console.log('Open create caregiver modal');
    };

    const handleEdit = (caregiver, closeMenu) => {
        closeMenu();
        // TODO: open edit modal pre-filled with caregiver data, then call updateCaregiver(caregiver.id, formData)
        console.log('Edit caregiver:', caregiver.id);
    };

    const handleDeactivate = (caregiver, closeMenu) => {
        closeMenu();
        deactivateCaregiver(caregiver.id);
    };

    const handlePay = (caregiver) => {
        // TODO: trigger payment flow via adminService.executePayment (future)
        console.log('Pay caregiver:', caregiver.id);
    };

    // ── Table column definitions ───────────────────────────────────────────
    const columns = [
        {
            header: 'Nombre',
            accessor: 'fullName',
            cellClassName: 'font-body text-f-primary font-bold',
        },
        {
            header: 'DNI',
            accessor: 'dni',
        },
        {
            header: 'CBU/CVU',
            accessor: 'cbu',
            cellClassName: 'font-mono text-sm',
        },
        {
            header: 'Horas Trabajadas',
            accessor: 'workedHours',
            cellClassName: 'text-center',
            render: (row) => (
                <span className="font-semibold text-f-primary">
                    {row.workedHours} hs
                </span>
            ),
        },
        {
            header: 'Pago',
            accessor: 'payment',
            render: (row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePay(row);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors border border-green-200"
                    disabled={row.workedHours === 0}
                >
                    <CreditCard size={14} />
                    Pagar
                </button>
            ),
        },
    ];

    // ── Row action menu ────────────────────────────────────────────────────
    const renderActions = (caregiver, closeMenu) => (
        <>
            <button
                onClick={() => handleEdit(caregiver, closeMenu)}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Edit2 size={16} />
                Editar
            </button>
            <button
                onClick={() => handleDeactivate(caregiver, closeMenu)}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Ban size={16} />
                Desactivar
            </button>
        </>
    );

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        
            <div className="max-w-6xl ml-auto mr-auto">

                {/* Header Section: Title & Add Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-semibold text-f-primary">Cuidadores</h1>
                    <Button
                        variant="admin"
                        icon={<Plus size={20} />}
                        className="h-10 truncate"
                        onClick={handleCreate}
                    >
                        Agregar Cuidador
                    </Button>
                </div>

                {/* Filters & Search Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Filter Pills */}
                    <div className="flex gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedFilter === filter
                                        ? 'bg-white text-f-primary shadow-sm border border-gray-200'
                                        : 'bg-transparent text-f-secondary hover:text-f-primary hover:bg-gray-100'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar cuidador..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin w-64"
                        />
                    </div>
                </div>

                {/* Content: Spinner → EmptyState → Table */}
                {loading ? (
                    <LoadingSpinner message="Cargando cuidadores..." />
                ) : caregivers.length === 0 ? (
                    <EmptyState message="No hay cuidadores registrados." />
                ) : (
                    <Table
                        columns={columns}
                        data={caregivers}
                        renderActions={renderActions}
                    />
                )}
            </div>
        
    );
};

export default AdminCaregivers;
