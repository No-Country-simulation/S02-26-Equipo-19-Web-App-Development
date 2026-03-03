import { Search } from 'lucide-react';

/**
 * SearchInput – Shared search bar component for Admin pages.
 * 
 * @param {string} value - Current input value.
 * @param {function} onChange - Change handler function.
 * @param {string} placeholder - Input placeholder text.
 * @param {string} className - Optional additional CSS classes.
 */
const SearchInput = ({ value, onChange, placeholder = "Buscar...", className = "" }) => {
    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-page-admin text-sm w-full md:w-64"
            />
        </div>
    );
};


export default SearchInput;
