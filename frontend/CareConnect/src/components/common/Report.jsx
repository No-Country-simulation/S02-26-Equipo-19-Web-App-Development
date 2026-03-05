import { FileText, Calendar } from "lucide-react";
import ReportVitals from "./ReportVitals";

const Report = ({ report }) => {
  const vitalsLabels = {
    bloodPressure: "Presión Arterial",
    temperature: "Temperatura",
    pulse: "Pulso",
  };

  const start = new Date(report.reportDateStart);
  const end = new Date(report.reportDateEnd);
  const dateString =
    report.reportDateStart === report.reportDateEnd
      ? start.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
      : `${start.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
        })} - ${end.toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
        })}`;

  return (
    <div className="w-full p-6 mb-4 bg-bg-secondary border border-border rounded-lg ">
      {/* cabecera */}
      <div className="flex items-start justify-between">
        <div className="flex gap-1">
          <div className="w-8 h-8 text-page-family bg-page-family-hover rounded-sm flex ">
            <FileText size={20} className="m-auto" />
          </div>
          <div>
            <h4 className="font-heading text-base text-f-primary">
              {report.observations}
            </h4>
            <p className="font-body text-xs text-f-secondary -mt-1.5">
              Por {report.caregiverName}
            </p>
          </div>
        </div>
        <div className="text-xs text-f-secondary font-body">
          <div className="flex gap-0.5">
            <Calendar size={16} strokeWidth={1} />
            <p>{dateString}</p>
          </div>
        </div>
      </div>
      {/* contenido */}
      <div className="bg-bg-tertiary rounded-lg p-4 my-4">
        <p className="font-body text-f-primary font-light">
          {report.reportContent}
        </p>
        {report.observations && (
          <p className="mt-2 text-sm text-f-secondary">
            {report.observations}
          </p>
        )}
      </div>
      {/* signos vitales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-f-primary">
        {Object.entries(vitalsLabels).map(([key, label]) => (
          report[key] && (
            <ReportVitals
              title={label}
              content={report[key]}
              key={key}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Report;
