import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import AdminLayout from './layouts/AdminLayout';
import Button from '../../components/common/Button';
import UsersTable from './components/UsersTable';

// Dummy data for users
const usersData = [
    { id: 1, name: 'Pablo', email: 'pablo@gmail.com', role: 'Cuidador', status: 'Activo' },
    { id: 2, name: 'Juan', email: 'juan@gmail.com', role: 'Admin', status: 'Activo' },
    { id: 3, name: 'Maria', email: 'maria@gmail.com', role: 'Familia', status: 'Inactivo' },
    { id: 4, name: 'Pedro', email: 'pedro@gmail.com', role: 'Cuidador', status: 'Activo' },
];

const AdminUsers = () => {
    const [selectedFilter, setSelectedFilter] = useState('Todos');

    const filters = ['Todos', 'Cuidadores', 'Pacientes', 'Familia'];

    return (
        <AdminLayout activeItem="usuarios">
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
                            placeholder=""
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin w-64"
                        />
                    </div>
                </div>

                {/* Users Table */}
                <UsersTable users={usersData} />
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;
