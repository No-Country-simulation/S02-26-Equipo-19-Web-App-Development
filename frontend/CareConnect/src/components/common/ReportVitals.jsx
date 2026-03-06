const ReportVitals = ({title, content}) => {
    return (
        <div>
            <h4 className="text-xs text-f-secondary  mb-1">{title}</h4>
            <p className="text-sm">{content}</p>
        </div>
    );
};
export default ReportVitals;
