/**
 * EmptyState – presentational component.
 * Shown when data is null or a list is empty.
 * @param {string} [message] - Optional custom message.
 */
const EmptyState = ({ message = "No hay datos disponibles" }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 text-f-secondary">
            <svg
                className="w-12 h-12 mb-4 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M9 17H5a2 2 0 01-2-2v-1a7 7 0 0114 0v1a2 2 0 01-2 2h-4z"
                />
            </svg>
            <p className="font-body text-sm">{message}</p>
        </div>
    );
};

export default EmptyState;
