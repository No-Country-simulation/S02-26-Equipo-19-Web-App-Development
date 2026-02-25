import { useState } from 'react';
import { Plus, Search, Edit2, Ban, Trash2 } from 'lucide-react';
import AdminLayout from './layouts/AdminLayout';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';

// Dummy data for patients
const patientsData = [
    { id: 1, name: 'Roberto Gómez', age: 35, dni: '32123456', representative: 'Mariana Pérez', status: 'Activo' },
    { id: 2, name: 'Laura Martinez', age: 28, dni: '38654321', representative: '-', status: 'Activo' },
    { id: 3, name: 'Carlos López', age: 42, dni: '28987654', representative: 'Juan Carlos', status: 'Inactivo' },
    { id: 4, name: 'Ana Rodríguez', age: 50, dni: '20111222', representative: '-', status: 'Activo' },
];

const AdminPatients = () => {
    const [selectedFilter, setSelectedFilter] = useState('Todos');

    const filters = ['Todos', 'Activos', 'Inactivos'];

    const columns = [
        {
            header: 'Nombre',
            accessor: 'name',
            cellClassName: 'font-body text-f-primary font-bold'
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
            render: (row) => row.representative || '-'
        }
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
                onClick={() => { console.log('Deactivate', row); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Ban size={16} />
                Desactivar
            </button>
            <button
                onClick={() => { console.log('Delete', row); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
                <Trash2 size={16} />
                Eliminar
            </button>
        </>
    );

    return (
        
            <div className="max-w-6xl ml-auto mr-auto">

                {/* Header Section: Title & Add Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-semibold text-f-primary">Pacientes</h1>
                    <Button
                        variant="admin"
                        icon={<Plus size={20} />}
                        className="h-10 truncate"
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
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar paciente..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin w-64"
                        />
                    </div>
                </div>

                {/* Caregivers Table */}
                <Table
                    columns={columns}
                    data={patientsData}
                    renderActions={renderActions}
                />
            </div>
        
    );
};

export default AdminPatients;
