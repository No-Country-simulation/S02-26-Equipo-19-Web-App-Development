import Report from "./Report";
import { FileText } from "lucide-react";

const ReportSection = () => {
    return (
        <div>
            <header className="mt-4 flex justify-between items-baseline">
                <div className="text-f-primary flex items-center gap-1">
                    <FileText size={20} strokeWidth={2.25} />
                    <h3 className="text-xl font-heading font-medium">
                        Informes Recientes
                    </h3>
                </div>
                <p className="text-f-secondary font-heading text-s">
                    5 registros
                </p>
            </header>
            <Report />
        </div>
    );
};
export default ReportSection;
