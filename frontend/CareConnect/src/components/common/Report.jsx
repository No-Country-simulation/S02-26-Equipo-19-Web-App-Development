import { FileText, Calendar, Clock } from "lucide-react";
import ReportVitals from "./ReportVitals";
const Report = ({report}) => {

    const vitalsLabels = {
        presion: "Presión Arterial",
        temperatura: "Temperatura",
        pulso: "Pulso",
    };
    const vitalsOrder = ["presion", "temperatura", "pulso"];
    return (
        // card
        <div className="w-full p-6 mb-4 bg-bg-secondary border border-border rounded-lg ">
            {/*card Header */}
            <div className="flex items-start justify-between">
                <div className="flex gap-1">
                    <div className="w-8 h-8 text-page-family bg-page-family-hover rounded-sm flex ">
                        <FileText size={20} className="m-auto" />
                    </div>
                    <div className="">
                        <h4 className="font-heading text-base text-f-primary">
                            {report.type}
                        </h4>
                        <p className="font-body text-xs text-f-secondary -mt-1.5">
                            Por {report.caregiver}
                        </p>
                    </div>
                </div>
                <div className="text-xs text-f-secondary  font-body">
                    <div className="flex gap-0.5">
                        <Calendar size={16} strokeWidth={1} />
                        <p className="">             
                            {new Date(report.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}</p>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                        <Clock size={16} strokeWidth={1} />
                        <p>{report.time}</p>
                    </div>
                </div>
            </div>
            {/*card Header */}
            {/* repor-Info */}
            <div className="bg-bg-tertiary rounded-lg p-4 my-4">
                <p className="font-body text-f-primary font-light">
                    {report.notes}
                </p>
            </div>
            {/* repor-Info */}
            {/* footer-vitals */}
            {report.vitals && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-f-primary">
                    {vitalsOrder.map((vital) => (
                        <ReportVitals
                            title={vitalsLabels[vital]}
                            content={report.vitals[vital]}
                            key={vital}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Report;
