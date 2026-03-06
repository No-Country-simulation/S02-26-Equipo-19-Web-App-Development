import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import Input from '../../components/common/Input';
import { useUsers } from '../../hooks/useUsers';
import SearchInput from './components/SearchInput';
import AdminModal from './components/AdminModal';

const AdminUsers = () => {
    const { users, loading, createUser } = useUsers();
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    // -- Modal and Form State --
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Cuidador',
        password: ''
    });

    const filters = ['Todos', 'Admin', 'Cuidadores', 'Pacientes'];

    // -----------------------------------------------------------------
    // Derived list: filter by role pill + search input
    // -----------------------------------------------------------------
    const filteredUsers = users.filter((user) => {
        const matchesFilter =
            selectedFilter === 'Todos' ||
            (selectedFilter === 'Admin' && user.role === 'Admin') ||
            (selectedFilter === 'Cuidadores' && user.role === 'Cuidador') ||
            (selectedFilter === 'Pacientes' && user.role === 'Paciente');

        const query = searchQuery.toLowerCase();
        const matchesSearch =
            !query ||
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
    });

    const columns = [
        {
            header: 'Nombre',
            accessor: 'name',
            cellClassName: 'font-body text-f-primary font-bold'
        },
        {
            header: 'Correo',
            accessor: 'email',
        },
        {
            header: 'Rol',
            accessor: 'role',
        },
        {
            header: 'Estado',
            accessor: 'status',
            render: (user) => (
                <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${user.status === 'Activo'
                        ? 'bg-page-caregivers-hover text-page-caregivers'
                        : 'bg-bg-secondary text-f-secondary dark:bg-bg-tertiary dark:text-f-primary'
                        }`}
                >
                    {user.status}
                </span>
            )
        }
    ];

    const handleCreate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', role: 'Cuidador', password: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            return;
        }

        setIsSubmitting(true);
        try {
            await createUser(formData);
            handleCloseModal();
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl ml-auto mr-auto">
            {/* Header Section: Title & Add Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-semibold text-f-primary">Usuarios</h1>
                <Button
                    variant="admin"
                    icon={<Plus size={20} />}
                    className="h-10"
                    onClick={handleCreate}
                >
                    Agregar Usuario
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
                    placeholder="Buscar usuario..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
            </div>

            {/* Loading Spinner */}
            {loading && <LoadingSpinner message="Cargando usuarios..." />}

            {/* Empty State */}
            {!loading && filteredUsers.length === 0 && (
                <EmptyState message="No se encontraron usuarios." />
            )}

            {/* Users Table */}
            {!loading && filteredUsers.length > 0 && (
                <Table
                    columns={columns}
                    data={filteredUsers}
                />
            )}

            {/* Modal de Creación */}
            <AdminModal
                title="Agregar Nuevo Usuario"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Nombre Completo</label>
                        <Input
                            placeholder="Ej: Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Correo Electrónico</label>
                        <Input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Rol</label>
                        <select
                            className="w-full px-4 py-3.5 rounded-lg border border-border bg-bg-secondary text-f-primary font-body focus:outline-none focus:ring-2 focus:ring-page-admin transition-all"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="Cuidador">Cuidador</option>
                            <option value="Paciente">Paciente</option>
                            <option value="Familia">Familia</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-f-secondary mb-1">Contraseña</label>
                        <Input
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
                        </Button>
                    </div>
                </form>
            </AdminModal>
        </div>
    );
};

export default AdminUsers;
