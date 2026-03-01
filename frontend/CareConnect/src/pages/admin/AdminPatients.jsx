import { useState } from 'react';
import { Plus, Edit2, Ban } from 'lucide-react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Input from '../../components/common/Input';
import { usePatients } from '../../hooks/usePatients';
import SearchInput from './components/SearchInput';
import AdminModal from './components/AdminModal';

const AdminPatients = () => {
    const { patients, loading, updatePatient, deactivatePatient } = usePatients();

    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    // -- Modal and Form State --
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        dni: '',
        representative: ''
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
            p.dni.includes(query);

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
            header: 'Edad',
            accessor: 'age',
        },
        {
            header: 'DNI',
            accessor: 'dni',
        },
        {
            header: 'Representante',
            accessor: 'representative',
            render: (row) => row.representative || '-',
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
    const renderActions = (row, closeMenu) => (
        <>
            <button
                onClick={() => { console.log('Edit', row); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Edit2 size={16} />
                Editar
            </button>
            <button
                onClick={() => { deactivatePatient(row.id); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Ban size={16} />
                Desactivar
            </button>
        </>
    );

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ fullName: '', age: '', dni: '', representative: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // UI Only - no backend call yet
        console.log('Creating patient:', formData);
        handleCloseModal();
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
                    renderActions={renderActions}
                />
            )}

            {/* Modal de Creación */}
            <AdminModal
                title="Agregar Nuevo Paciente"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Nombre Completo</label>
                        <Input
                            placeholder="Ej: Pedro Gómez"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-f-secondary mb-1">Edad</label>
                            <Input
                                type="number"
                                placeholder="Ej: 75"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
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
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Representante / Familiar</label>
                        <Input
                            placeholder="Nombre del contacto principal"
                            value={formData.representative}
                            onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
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
                            Guardar Paciente
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>
    );
};

export default AdminPatients;
