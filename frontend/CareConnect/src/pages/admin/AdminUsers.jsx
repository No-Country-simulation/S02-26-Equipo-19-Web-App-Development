import { useState } from 'react';
import { Plus, Search, Edit2, Ban } from 'lucide-react';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useUsers } from '../../hooks/useUsers';

const AdminUsers = () => {
    const { users, loading, deactivateUser } = useUsers();
    const [selectedFilter, setSelectedFilter] = useState('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['Todos', 'Cuidadores', 'Pacientes', 'Familia'];

    // -----------------------------------------------------------------
    // Derived list: filter by role pill + search input
    // -----------------------------------------------------------------
    const filteredUsers = users.filter((user) => {
        const matchesFilter =
            selectedFilter === 'Todos' ||
            (selectedFilter === 'Cuidadores' && user.role === 'Cuidador') ||
            (selectedFilter === 'Pacientes' && user.role === 'Paciente') ||
            (selectedFilter === 'Familia' && user.role === 'Familia');

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
                            : 'bg-gray-100 text-gray-500'
                        }`}
                >
                    {user.status}
                </span>
            )
        }
    ];

    const renderActions = (user, closeMenu) => (
        <>
            <button
                onClick={() => { console.log('Edit', user); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Edit2 size={16} />
                Editar
            </button>
            <button
                onClick={() => { deactivateUser(user.id); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Ban size={16} />
                Desactivar
            </button>
        </>
    );

    return (
        <div className="max-w-6xl ml-auto mr-auto">
            {/* Header Section: Title & Add Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-semibold text-f-primary">Usuarios</h1>
                <Button
                    variant="admin"
                    icon={<Plus size={20} />}
                    className="h-10"
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
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin w-64"
                    />
                </div>
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
                    renderActions={renderActions}
                />
            )}
        </div>
    );
};

export default AdminUsers;
