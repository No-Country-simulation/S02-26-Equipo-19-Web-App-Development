import { useState } from 'react';
import { MoreHorizontal, Edit2, Ban, Trash2 } from 'lucide-react';

const UsersTable = ({ users }) => {
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    return (
        <div className="bg-bg-primary overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="text-left">
                        <th className="py-4 px-4 text-f-secondary font-medium text-lg">Nombre</th>
                        <th className="py-4 px-4 text-f-secondary font-medium text-lg">Correo</th>
                        <th className="py-4 px-4 text-f-secondary font-medium text-lg">Rol</th>
                        <th className="py-4 px-4 text-f-secondary font-medium text-lg">Estado</th>
                        <th className="py-4 px-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <tr key={user.id} className="group hover:bg-white transition-colors border-b border-gray-100 last:border-0">
                            <td className="py-4 px-4 font-body text-f-primary font-bold">{user.name}</td>
                            <td className="py-4 px-4 text-f-secondary">{user.email}</td>
                            <td className="py-4 px-4 text-f-secondary">{user.role}</td>
                            <td className="py-4 px-4">
                                {user.status === 'Activo' && (
                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-page-caregivers-hover text-page-caregivers">
                                        Activo
                                    </span>
                                )}
                            </td>
                            <td className="py-4 px-4 text-right relative">
                                <button
                                    onClick={() => toggleMenu(user.id)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {/* Action Menu dropdown */}
                                {activeMenu === user.id && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
                                        <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <Edit2 size={16} />
                                            Editar
                                        </button>
                                        <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                            <Ban size={16} />
                                            Desactivar
                                        </button>
                                        <button className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <Trash2 size={16} />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
