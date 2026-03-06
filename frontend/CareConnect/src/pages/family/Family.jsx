import Header from "../../components/layout/Header";
import DashBoard from "../../components/layout/DashBoard";
import PatientCard from "../../components/layout/PatientCard";
import ReportSection from "../../components/layout/ReportSection";
import Report from "../../components/common/Report"
import { FileText } from "lucide-react";

import { useState } from "react";
const Family = () => {
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
            status: "approve",
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
    const [activeId, setActiveId] = useState(1);
    const patients = [
        {
            id: 1,
            name: "Maria Garcia",
            age: "60",
            estable: true,
            reports_:      {
            id: 3,
            date: "2026-02-04",
            time: "14:00",
            caregiver: "Maria",
            type: "Medicación",
            notes: "Aseo personal realizado. Cambio de ropa. Paciente colaborador durante todo el proceso.",
            vitals: null,
        },

            
        },
        { id: 2, name: "Pepe", age: "70", estable: false },
    ];

    return (
        <>
            <Header />
            <main className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-4">
                <aside className="lg:col-span-1">
                    <DashBoard
                        patients={patients}
                        activeId={activeId}
                        setActiveId={setActiveId}
                    />
                </aside>
                <section className="lg:col-span-3">
                    <PatientCard patient={patients[activeId - 1]} />
                    <ReportSection
                        length={reports.length}
                        title={"Informes Recientes"}
                        Icon={FileText}
                    >
                        {reports.map((report) => (
                            <Report report={report} key={report.id} />
                        ))}
                    </ReportSection>
                </section>
            </main>
        </>
    );
};
export default Family;
