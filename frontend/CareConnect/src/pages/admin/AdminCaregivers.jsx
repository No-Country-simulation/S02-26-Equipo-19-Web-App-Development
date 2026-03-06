import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
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
 */
const AdminCaregivers = () => {
    // ── Server state via hook ──────────────────────────────────────────────
    const {
        caregivers,
        loading,
        createCaregiver,
    } = useCaregivers();

    // ── Local UI state ─────────────────────────────────────────────────────
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    // -- Modal and Form State --
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        caregiverDni: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        birthDate: '',
        address: ''
    });

    const filters = ['Todos', 'Activos', 'Inactivos'];

    // ── Action handlers – delegate to hook, no inline async ───────────────
    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            caregiverDni: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            birthDate: '',
            address: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.caregiverDni ||
            !formData.email ||
            !formData.password ||
            !formData.phoneNumber ||
            !formData.birthDate ||
            !formData.address
        ) {
            toast.error('Por favor completa todos los campos obligatorios');
            return;
        }

        setIsSubmitting(true);
        try {
            await createCaregiver(formData);
            toast.success('Cuidador agregado correctamente');
            handleCloseModal();
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                />
            )}

            {/* Modal de Creación */}
            <AdminModal
                title="Agregar Nuevo Cuidador"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Nombre</label>
                            <Input
                                placeholder="Ej: Elena"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Apellido</label>
                            <Input
                                placeholder="Ej: Ruiz"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">DNI</label>
                            <Input
                                placeholder="8 dígitos"
                                value={formData.caregiverDni}
                                onChange={(e) => setFormData({ ...formData, caregiverDni: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Fecha de Nacimiento</label>
                            <Input
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Email</label>
                            <Input
                                type="email"
                                placeholder="cuidador@ejemplo.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Teléfono</label>
                            <Input
                                placeholder="+5411..."
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Contraseña</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Dirección</label>
                            <Input
                                placeholder="Calle 123, Ciudad"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button
                            type="button"
                            variant="danger"
                            onClick={handleCloseModal}
                            className="h-11"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="admin"
                            className="h-11"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Cuidador'}
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>

    );
};

export default AdminCaregivers;