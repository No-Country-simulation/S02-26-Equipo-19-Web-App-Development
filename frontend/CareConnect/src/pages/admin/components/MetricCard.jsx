const MetricCard = ({ title, value, icon, iconBgClass, iconColorClass }) => {
    return (
        <div className="bg-bg-secondary border border-border rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="font-body text-f-secondary text-sm mb-1">{title}</p>
                <p className="font-heading text-f-primary text-4xl font-bold">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClass}`}>
                <div className={iconColorClass}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
