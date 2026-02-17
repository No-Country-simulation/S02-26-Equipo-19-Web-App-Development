import Report from "./Report";
import { FileText } from "lucide-react";

const ReportSection = () => {
    const reports = [
        {
            id: 1,
            date: "2026-02-05",
            time: "08:00",
            caregiver: "Ana Rodríguez",
            type: "Medicación",
            notes: "Medicación matutina administrada correctamente. Paciente se encuentra en buen estado de ánimo.",
            vitals: {
                presion: "120/80 mmHg",
                temperatura: "36.5°C",
                pulso: "72 bpm",
            },
        },
        {
            id: 1,
            date: "2026-02-04",
            time: "08:00",
            caregiver: "Ana Rodríguez",
            type: "Medicación",
            notes: "Medicación matutina administrada correctamente. Paciente se encuentra en buen estado de ánimo.",
            vitals: {
                presion: "120/80 mmHg",
                temperatura: "36.5°C",
                pulso: "72 bpm",
            },
        },
        {
            id: 2,
            date: "2026-02-04",
            time: "10:30",
            caregiver: "Ana Rodríguez",
            type: "Medicación",
            notes: "Desayuno completo. Buena ingesta de líquidos. Sin dificultad para tragar.",
            vitals: null,
        },
        {
            id: 3,
            date: "2026-02-04",
            time: "14:00",
            caregiver: "Carlos Martínez",
            type: "Medicación",
            notes: "Aseo personal realizado. Cambio de ropa. Paciente colaborador durante todo el proceso.",
            vitals: null,
        },
    ];
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
                    {reports.length} registros
                </p>
            </header>

            {reports.map((report) => (
                <Report report={report}  key={report.id}/>
            ))}
        </div>
    );
};
export default ReportSection;
