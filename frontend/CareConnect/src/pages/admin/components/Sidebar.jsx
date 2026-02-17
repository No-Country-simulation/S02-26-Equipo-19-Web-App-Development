import { Home, Users, UserCircle, FileText, Heart } from 'lucide-react';

const Sidebar = ({ activeItem = 'inicio' }) => {
    const menuItems = [
        { id: 'inicio', label: 'Inicio', icon: Home },
        { id: 'usuarios', label: 'Usuarios', icon: Users },
        { id: 'pacientes', label: 'Pacientes', icon: UserCircle },
        { id: 'reportes', label: 'Reportes', icon: FileText },
        { id: 'cuidadores', label: 'Cuidadores', icon: Heart },
    ];

    return (
        <aside className="w-64 bg-bg-secondary border-r border-border flex flex-col">
            <nav className="flex-1 px-3 py-6">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm transition-colors ${isActive
                                        ? 'bg-page-admin text-white font-medium'
                                        : 'text-f-secondary hover:bg-bg-tertiary hover:text-f-primary'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
