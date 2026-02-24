

const ReportSection = ({ children, title, Icon, length, }) => {

    return (
        <div>
            <header className="mt-4 flex justify-between items-baseline">
                <div className="text-f-primary flex items-center gap-1">
                    <Icon size={20} strokeWidth={2.25} />
                    <h3 className="text-xl font-heading font-medium">
                        {title}
                    </h3>
                </div>
                <p className="text-f-secondary font-heading text-s">
                    {length} registros
                </p>
            </header>
            {children}
        </div>
    );
};
export default ReportSection;
