import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

const Table = ({ columns, data, renderActions }) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = (id) => {
        setActiveMenu(activeMenu === id ? null : id);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-bg-primary overflow-hidden pb-32"> {/* Added padding bottom for dropdown space if last item */}
            <table className="w-full">
                <thead>
                    <tr className="text-left">
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`py-4 px-4 text-f-secondary font-medium text-lg ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                        {renderActions && <th className="py-4 px-4"></th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={row.id || rowIndex}
                            className="group hover:bg-white transition-colors border-b border-gray-100 last:border-0"
                        >
                            {columns.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`py-4 px-4 ${col.cellClassName || 'text-f-secondary'}`}
                                >
                                    {col.render
                                        ? col.render(row)
                                        : row[col.accessor]}
                                </td>
                            ))}

                            {renderActions && (
                                <td className="py-4 px-4 text-right relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMenu(row.id);
                                        }}
                                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <MoreHorizontal size={20} />
                                    </button>

                                    {/* Action Menu dropdown */}
                                    {activeMenu === row.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden"
                                        >
                                            {renderActions(row, () => setActiveMenu(null))}
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length + (renderActions ? 1 : 0)}
                                className="py-8 text-center text-gray-500"
                            >
                                No hay datos para mostrar
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
