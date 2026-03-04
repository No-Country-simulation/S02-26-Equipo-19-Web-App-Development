import { FileText, Calendar, Clock, CheckCircle, XCircle, User, Stethoscope } from "lucide-react";

// ---------------------------------------------------------------------------
// Status config – label, colors, badge
// ---------------------------------------------------------------------------
const STATUS_CONFIG = {
    pending: {
        label: "Pendiente",
        badgeClass: "bg-yellow-100 text-yellow-800",
    },
    approved: {
        label: "Aprobado",
        badgeClass: "bg-green-100 text-green-800",
    },
    rejected: {
        label: "Rechazado",
        badgeClass: "bg-red-100 text-red-800",
    },
};

/**
 * ReportCard – presentational component for displaying caregiver reports.
 * 
 * @param {Object} props
 * @param {Object} props.report - The report data.
 * @param {Function} props.onApprove - Callback for approving the report.
 * @param {Function} props.onReject - Callback for rejecting the report.
 */
const ReportCard = ({ report, onApprove, onReject }) => {
    const vitalsOrder = ["presion", "temperatura", "pulso"];
    const vitalsLabels = {
        presion: "Presión Arterial",
        temperatura: "Temperatura",
        pulso: "Pulso",
    };

    const status = STATUS_CONFIG[report.status] ?? STATUS_CONFIG.pending;
    const isPending = report.status === "pending";

    return (
        <div className="w-full p-6 mb-4 bg-bg-secondary border border-border rounded-lg">

            {/* Card Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-2 items-start">
                    {/* Icon */}
                    <div className="w-9 h-9 shrink-0 text-page-admin bg-blue-50 rounded-md flex items-center justify-center">
                        <FileText size={18} />
                    </div>
                    {/* Title + meta */}
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-heading text-base font-semibold text-f-primary">
                                {report.type}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.badgeClass}`}>
                                {status.label}
                            </span>
                        </div>
                        {/* Caregiver & patient */}
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                            <span className="font-body text-xs text-f-secondary flex items-center gap-1">
                                <User size={12} />
                                <span>
                                    <strong className="text-f-primary">Cuidador:</strong> {report.caregiver}
                                </span>
                            </span>
                            <span className="font-body text-xs text-f-secondary flex items-center gap-1">
                                <Stethoscope size={12} />
                                <span>
                                    <strong className="text-f-primary">Paciente:</strong> {report.patient}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Date & time */}
                <div className="text-xs text-f-secondary font-body shrink-0 text-right">
                    <div className="flex gap-1 items-center justify-end">
                        <Calendar size={14} strokeWidth={1.5} />
                        <span>
                            {new Date(report.date).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                            })}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center justify-end mt-1">
                        <Clock size={14} strokeWidth={1.5} />
                        <span>{report.time}</span>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="bg-bg-tertiary rounded-lg p-4 my-4">
                <p className="font-body text-f-primary font-light text-sm leading-relaxed">
                    {report.notes}
                </p>
                {report.observations && (
                    <p className="font-body text-f-secondary font-light text-xs leading-relaxed mt-2 pt-2 border-t border-border">
                        <strong className="text-f-primary">Observaciones:</strong> {report.observations}
                    </p>
                )}
            </div>

            {/* Vitals */}
            {report.vitals && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border text-f-primary mb-5">
                    {vitalsOrder.map((key) => (
                        <div key={key} className="flex flex-col gap-0.5">
                            <span className="text-xs text-f-secondary font-body">{vitalsLabels[key]}</span>
                            <span className="text-sm font-heading font-semibold">{report.vitals[key]}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Actions – only shown for pending reports */}
            {isPending && (
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => onApprove(report.id)}
                        className="flex-2 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <CheckCircle size={18} />
                        Aprobar Reporte
                    </button>
                    <button
                        onClick={() => onReject(report.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <XCircle size={18} />
                        Rechazar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReportCard;
