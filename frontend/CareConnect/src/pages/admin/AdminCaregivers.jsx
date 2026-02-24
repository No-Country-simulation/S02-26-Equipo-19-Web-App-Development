import { useState } from 'react';
import { Plus, Search, Edit2, Ban, Trash2, CreditCard } from 'lucide-react';
import AdminLayout from './layouts/AdminLayout';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';

// Dummy data for caregivers
const caregiversData = [
    { id: 1, name: 'Pedro Martinez', dni: '25123456', cbu_cvu: '0000003100012345678901', hoursWorked: 45, status: 'Activo' },
    { id: 2, name: 'Ana Garcia', dni: '28654321', cbu_cvu: '0000003100098765432109', hoursWorked: 32, status: 'Activo' },
    { id: 3, name: 'Lucas Rodriguez', dni: '30987654', cbu_cvu: '0000003100045612378904', hoursWorked: 0, status: 'Inactivo' },
    { id: 4, name: 'Maria Lopez', dni: '22111222', cbu_cvu: '0000003100078945612307', hoursWorked: 50, status: 'Activo' },
];

const AdminCaregivers = () => {
    const [selectedFilter, setSelectedFilter] = useState('Todos');

    const filters = ['Todos', 'Activos', 'Inactivos'];

    const handlePay = (caregiver) => {
        console.log(`Paying to ${caregiver.name}`);
        // Logic for payment modal or action
    };

    const columns = [
        {
            header: 'Nombre',
            accessor: 'name',
            cellClassName: 'font-body text-f-primary font-bold'
        },
        {
            header: 'DNI',
            accessor: 'dni',
        },
        {
            header: 'CBU/CVU',
            accessor: 'cbu_cvu',
            cellClassName: 'font-mono text-sm'
        },
        {
            header: 'Horas Trabajadas',
            accessor: 'hoursWorked',
            cellClassName: 'text-center',
            render: (row) => (
                <span className="font-semibold text-f-primary">
                    {row.hoursWorked} hs
                </span>
            )
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
                    disabled={row.hoursWorked === 0}
                >
                    <CreditCard size={14} />
                    Pagar
                </button>
            )
        }
    ];

    const renderActions = (caregiver, closeMenu) => (
        <>
            <button
                onClick={() => { console.log('Edit', caregiver); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Edit2 size={16} />
                Editar
            </button>
            <button
                onClick={() => { console.log('Deactivate', caregiver); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
                <Ban size={16} />
                Desactivar
            </button>
            <button
                onClick={() => { console.log('Delete', caregiver); closeMenu(); }}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
                <Trash2 size={16} />
                Eliminar
            </button>
        </>
    );

    return (
        <AdminLayout activeItem="cuidadores">
            <div className="max-w-6xl ml-auto mr-auto">

                {/* Header Section: Title & Add Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-heading font-semibold text-f-primary">Cuidadores</h1>
                    <Button
                        variant="admin"
                        icon={<Plus size={20} />}
                        className="h-10 truncate"
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
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin w-64"
                        />
                    </div>
                </div>

                {/* Caregivers Table */}
                <Table
                    columns={columns}
                    data={caregiversData}
                    renderActions={renderActions}
                />
            </div>
        </AdminLayout>
    );
};

export default AdminCaregivers;
