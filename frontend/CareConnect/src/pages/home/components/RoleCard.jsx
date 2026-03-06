const RoleCard = ({ icon, label, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center gap-3 
        py-6 px-8 rounded-xl border-2 transition-all duration-200
        ${isSelected
                    ? 'border-page-login bg-bg-tertiary dark:bg-bg-secondary'
                    : 'border-border bg-bg-secondary hover:border-f-secondary hover:bg-bg-tertiary'
                }
      `}
        >
            <span className="text-f-primary">{icon}</span>
            <span className="font-body text-f-primary font-medium">{label}</span>
        </button>
    );
};

export default RoleCard;