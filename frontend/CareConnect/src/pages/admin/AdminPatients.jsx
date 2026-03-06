import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Input from '../../components/common/Input';
import { usePatients } from '../../hooks/usePatients';
import SearchInput from './components/SearchInput';
import AdminModal from './components/AdminModal';

const AdminPatients = () => {
    const { patients, loading, createPatient } = usePatients();

    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    // -- Modal and Form State --
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patientDni: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        address: '',
        guardianId: 1
    });

    const filters = ['Todos', 'Activos', 'Inactivos'];

    // -----------------------------------------------------------------
    // Derived list: filter by status pill + search input (client-side UX)
    // -----------------------------------------------------------------
    const filteredPatients = patients.filter((p) => {
        const matchesFilter =
            selectedFilter === 'Todos' ||
            (selectedFilter === 'Activos' && p.status === 'Activo') ||
            (selectedFilter === 'Inactivos' && p.status === 'Inactivo');

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            !query ||
            p.fullName.toLowerCase().includes(query) ||
            p.email?.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });

    // -----------------------------------------------------------------
    // Table configuration
    // -----------------------------------------------------------------
    const columns = [
        {
            header: 'Nombre',
            accessor: 'fullName',
            cellClassName: 'font-body text-f-primary font-bold',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Teléfono',
            accessor: 'phone',
            render: (row) => row.phone || '-',
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

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({
            firstName: '',
            lastName: '',
            patientDni: '',
            birthDate: '',
            email: '',
            phoneNumber: '',
            address: '',
            guardianId: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.patientDni ||
            !formData.birthDate ||
            !formData.email ||
            !formData.phoneNumber ||
            !formData.address
        ) {
            toast.error('Por favor completa todos los campos obligatorios');
            return;
        }

        setIsSubmitting(true);
        try {
            await createPatient(formData);
            toast.success('Paciente agregado correctamente');
            handleCloseModal();
        } catch (error) {
            // Error handling is centralized in usePatients/handleError
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // -----------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------
    return (
        <div className="max-w-6xl ml-auto mr-auto">

            {/* Header Section: Title & Add Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-semibold text-f-primary">Pacientes</h1>
                <Button
                    variant="admin"
                    icon={<Plus size={20} />}
                    className="h-10 truncate"
                    onClick={handleCreate}
                >
                    Agregar Paciente
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
                                ? 'bg-bg-secondary text-f-primary shadow-sm border border-border'
                                : 'bg-transparent text-f-secondary hover:text-f-primary hover:bg-bg-tertiary'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <SearchInput
                    placeholder="Buscar paciente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
            </div>

            {/* Loading */}
            {loading && <LoadingSpinner message="Cargando pacientes..." />}

            {/* Empty State */}
            {!loading && filteredPatients.length === 0 && (
                <EmptyState message="No se encontraron pacientes." />
            )}

            {/* Patients Table */}
            {!loading && filteredPatients.length > 0 && (
                <Table
                    columns={columns}
                    data={filteredPatients}
                />
            )}

            {/* Modal de Creación */}
            <AdminModal
                title="Agregar Nuevo Paciente"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Nombre</label>
                            <Input
                                placeholder="Ej: Pedro"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Apellido</label>
                            <Input
                                placeholder="Ej: Gómez"
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
                                value={formData.patientDni}
                                onChange={(e) => setFormData({ ...formData, patientDni: e.target.value })}
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
                                placeholder="paciente@ejemplo.com"
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

                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Dirección</label>
                        <Input
                            placeholder="Calle 123, Ciudad"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
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
                            {isSubmitting ? 'Guardando...' : 'Guardar Paciente'}
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>
    );
};

export default AdminPatients;
