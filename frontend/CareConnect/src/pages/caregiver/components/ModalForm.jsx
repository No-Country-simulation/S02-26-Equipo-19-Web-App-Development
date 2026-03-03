import { useState } from "react";
import Button from "../../../components/common/Button";

const ModalForm = ({ isOpen, setOpen, onAddReport, patientName }) => {
    const clasesCentrado =
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-secondary";

    const [type, setType] = useState("");
    const [notes, setNotes] = useState("");
    const [presion1, setPresion1] = useState("");
    const [presion2, setPresion2] = useState("");
    const [temp, setTemp] = useState("");
    const [pulso, setPulso] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const newReport = {
            id: Date.now(),
            date: now.toISOString().split("es-AR")[0],
            time: now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            caregiver: "Ana Rodríguez",
            type,
            notes,
            vitals:
                presion1 || presion2 || temp || pulso
                    ? {
                          presion:
                              presion1 && presion2
                                  ? `${presion1}/${presion2} mmHg`
                                  : null,
                          temperatura: temp ? `${temp}°C` : null,
                          pulso: pulso ? `${pulso} bpm` : null,
                      }
                    : null,
        };
        onAddReport(newReport);
        setOpen(false);
        setType("");
        setNotes("");
        setPresion1("");
        setPresion2("");
        setTemp("");
        setPulso("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`${clasesCentrado} w-full lg:max-w-11/12 p-5 shadow-lg rounded-lg ${
                isOpen ? "" : "hidden"
            } text-f-primary font-body z-30`}
        >
            <div className="display flex items-baseline justify-between">
                <h4 className="font-heading text-xl font-medium ">
                    Nuevo Reporte
                </h4>
                <p className="font-base">Para: {patientName || "…"} </p>
            </div>
            <div className="mt-6">
                <label htmlFor="actividad">Tipo de Actividad</label>
                <input
                    id="actividad"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-bg-primary border-border border p-3 rounded-lg outline-none"
                    placeholder="Medicacion"
                />
            </div>
            <div className="mt-6">
                <label htmlFor="notas">Notas y observaciones</label>
                <textarea
                    id="notas"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full min-h-32 bg-bg-primary border-border border px-4 py-3 rounded-lg resize-none  outline-none"
                    placeholder="Respira con dificultad"
                />
            </div>
            <div className="mt-6 text-xs text-f-secondary grid items-baseline grid-col-1 gap-4 md:gap-0 md:grid-cols-3 ">
                <div className="">
                    <p>Presion Arterial(opcional)</p>
                    <div className="flex items-center gap-1 text-2xl">
                        <input
                            type="number"
                            value={presion1}
                            onChange={(e) => setPresion1(e.target.value +"/")}
                            placeholder="120"
                            className="w-12 text-sm bg-bg-primary border-border border p-1 rounded-lg outline-none"
                        />
                        /
                        <input
                            type="number"
                            value={presion2}
                            onChange={(e) => setPresion2(e.target.value)}
                            placeholder="80"
                            className="w-12 text-sm bg-bg-primary border-border border p-1 rounded-lg outline-none"
                        />
                    </div>
                </div>
                <div className="flex-row items-center ">
                    <p>Temperatura(opcional)</p>
                    <input
                        type="number"
                        value={temp}
                        onChange={(e) => setTemp(e.target.value + "°C")}
                        className="bg-bg-primary border-border border p-2 rounded-lg outline-none"
                        placeholder="36.5"
                    />
                </div>
                <div>
                    <p>Pulso(opcional)</p>
                    <input
                        type="number"
                        value={pulso}
                        onChange={(e) => setPulso(e.target.value + " bpm")}
                        className="bg-bg-primary border-border border p-2 rounded-lg outline-none"
                        placeholder="72"
                    />
                </div>
            </div>
            <footer className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-bold">
                <Button
                    className="w-full md:col-span-2 bg-green-500 "
                    variant="caregivers"
                    onClick={handleSubmit}
                >
                    EnviarReporte
                </Button>
                <Button
                    className="w-full col-span-1 "
                    onClick={() => setOpen(false)}
                    variant="danger"
                >
                    Cancelar
                </Button>
            </footer>
        </form>
    );
};
export default ModalForm;
