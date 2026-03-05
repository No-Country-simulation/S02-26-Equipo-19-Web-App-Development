import Header from "../../components/layout/Header";
import DashBoard from "../../components/layout/DashBoard";
import PatientCard from "../../components/layout/PatientCard";
import Button from "../../components/common/Button";
import { Plus, Calendar } from "lucide-react";
import ReportSection from "../../components/layout/ReportSection";
import { useState } from "react";
import Report from "../../components/common/Report";
import ModalForm from "./components/ModalForm";

const Caregivers = () => {
    const [activeId, setActiveId] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: "Maria Garcia",
            age: "60",
            estable: true,
            reports: [
                {
                    reportId: 2,
                    patientCaregiverId: 1,
                    caregiverName: "Ana Rodríguez",
                    patientName: "Maria Garcia",
                    reportDateStart: "2026-02-04",
                    reportDateEnd: "2026-02-04",
                    reportContent:
                        "Desayuno completo. Buena ingesta de líquidos. Sin dificultad para tragar.",
                    observations: "Sin novedades relevantes.",
                    status: "COMPLETED",
                    createdAt: "2026-02-04T10:30:00Z",
                    bloodPressure: null,
                    temperature: null,
                    pulse: null,
                },
                {
                    reportId: 3,
                    patientCaregiverId: 1,
                    caregiverName: "Carlos Martínez",
                    patientName: "Maria Garcia",
                    reportDateStart: "2026-02-04",
                    reportDateEnd: "2026-02-04",
                    reportContent:
                        "Aseo personal realizado. Cambio de ropa. Paciente colaborador durante todo el proceso.",
                    observations: "Paciente cooperativo durante la higiene.",
                    status: "COMPLETED",
                    createdAt: "2026-02-04T14:00:00Z",
                    bloodPressure: null,
                    temperature: null,
                    pulse: null,
                },
            ],
        },
        {
            id: 2,
            name: "Pepe",
            age: "70",
            estable: false,
            reports: [
                {
                    reportId: 1,
                    patientCaregiverId: 2,
                    caregiverName: "Ana Rodríguez",
                    patientName: "Pepe",
                    reportDateStart: "2026-02-04",
                    reportDateEnd: "2026-02-04",
                    reportContent:
                        "Medicación matutina administrada correctamente. Paciente se encuentra en buen estado de ánimo.",
                    observations: "Presión normal, pulso estable.",
                    status: "COMPLETED",
                    createdAt: "2026-02-04T08:00:00Z",
                    bloodPressure: "120/80",
                    temperature: "36.5",
                    pulse: "72",
                },
            ],
        },
    ]);

    const addReport = (newReport) => {
        const reportWithObs = { observations: "", ...newReport };
        setPatients((prev) =>
            prev.map((p) =>
                p.id === activeId
                    ? {
                          ...p,
                          reports: [
                              { ...reportWithObs, reportId: Date.now() },
                              ...p.reports,
                          ],
                      }
                    : p,
            ),
        );
    };

    const activePatient = patients.find((p) => p.id === activeId);

    return (
        <>
            {modalOpen && (
                <div className="w-screen h-screen fixed bg-black/40 z-20" />
            )}
            <ModalForm
                isOpen={modalOpen}
                setOpen={setModalOpen}
                onAddReport={addReport}
                patientName={activePatient?.name}
            />
            <Header rol="caregivers" />
            <main className="p-4 gap-4 grid grid-cols-1 lg:grid-cols-4">
                <aside className=" lg:col-span-1">
                    <DashBoard
                        patients={patients}
                        activeId={activeId}
                        setActiveId={setActiveId}
                        rol="caregivers"
                    />
                    <div className="w-full p-4 mt-4 bg-bg-secondary border-border border rounded-lg">
                        <h3 className="text-f-primary text-lg font-bold font-heading">
                            Acciones Rapidas
                        </h3>
                        <Button
                            className=" w-full h-12 gap-1 mt-4 focus:ring-0 "
                            variant="caregivers"
                            onClick={() => setModalOpen(true)}
                        >
                            <Plus strokeWidth={"3px"} />
                            <p className="font-body font-bold">Crear Reporte</p>
                        </Button>
                    </div>
                </aside>
                <section className="lg:col-span-3">
                    <PatientCard patient={activePatient} />
                    <ReportSection
                        title="Mis Reportes"
                        length={activePatient?.reports.length || 0}
                        Icon={Calendar}
                    >
                        {activePatient?.reports.map((report) => (
                            <Report report={report} key={report.reportId} />
                        ))}
                    </ReportSection>
                </section>
            </main>
        </>
    );
};
export default Caregivers;
