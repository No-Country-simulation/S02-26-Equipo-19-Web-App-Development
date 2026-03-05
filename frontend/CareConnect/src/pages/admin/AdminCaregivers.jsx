import { useState } from 'react';
import { Plus, Edit2, Ban, CreditCard } from 'lucide-react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Input from '../../components/common/Input';
import { useCaregivers } from '../../hooks/useCaregivers';
import SearchInput from './components/SearchInput';
import AdminModal from './components/AdminModal';

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

    // -- Modal and Form State --
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        dni: '',
        cbu: ''
    });

    const filters = ['Todos', 'Activos', 'Inactivos'];

    // ── Action handlers – delegate to hook, no inline async ───────────────
    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ fullName: '', dni: '', cbu: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI Only - no backend call yet
        console.log('Creating caregiver:', formData);
        handleCloseModal();
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

    // ── Derived list: filter by status pill + search input ────────────────
    const filteredCaregivers = caregivers.filter((c) => {
        const matchesFilter =
            selectedFilter === 'Todos' ||
            (selectedFilter === 'Activos' && c.status === 'Activo') ||
            (selectedFilter === 'Inactivos' && c.status === 'Inactivo');

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            !query ||
            c.fullName.toLowerCase().includes(query) ||
            c.dni.includes(query) ||
            (c.email && c.email.toLowerCase().includes(query));

        return matchesFilter && matchesSearch;
    });

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
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Teléfono',
            accessor: 'phone',
            cellClassName: 'font-mono text-sm',
        },
        {
            header: 'Estado',
            accessor: 'status',
            render: (row) => (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.status === 'Activo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}
                >
                    {row.status}
                </span>
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
                <SearchInput
                    placeholder="Buscar cuidador..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
            </div>

            {/* Content: Spinner → EmptyState → Table */}
            {loading ? (
                <LoadingSpinner message="Cargando cuidadores..." />
            ) : filteredCaregivers.length === 0 ? (
                <EmptyState message="No se encontraron cuidadores." />
            ) : (
                <Table
                    columns={columns}
                    data={filteredCaregivers}
                    renderActions={renderActions}
                />
            )}

            {/* Modal de Creación */}
            <AdminModal
                title="Agregar Nuevo Cuidador"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Nombre Completo</label>
                        <Input
                            placeholder="Ej: Elena Ruiz"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">DNI</label>
                        <Input
                            placeholder="8 dígitos"
                            value={formData.dni}
                            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">CBU / CVU</label>
                        <Input
                            placeholder="22 dígitos"
                            value={formData.cbu}
                            onChange={(e) => setFormData({ ...formData, cbu: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button
                            type="button"
                            variant="danger"
                            onClick={handleCloseModal}
                            className="h-11"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="admin"
                            className="h-11"
                        >
                            Guardar Cuidador
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>

    );
};

export default AdminCaregivers;