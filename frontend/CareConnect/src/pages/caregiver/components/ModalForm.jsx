import Button from "../../../components/common/Button";

const ModalForm = ({ isOpen, setOpen }) => {
    const clasesCentrado =
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-secondary";
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form
            onSubmit={handleSubmit}
            className={`${clasesCentrado}  w-full lg:max-w-11/12  p-5 shadow-lg rounded-lg ${isOpen ? null : "hidden"} text-f-primary font-body z-30`}
        >
            <div className="display flex items-baseline justify-between">
                <h4 className="font-heading text-xl font-medium ">
                    Nuevo Reporte
                </h4>
                <p className="font-base">Para: pepe</p>
            </div>
            <div className="mt-6">
                <label htmlFor="actividad">Tipo de Actividad</label>
                <input
                    id="actividad"
                    type="text"
                    className="w-full bg-bg-primary border-border border p-3 rounded-lg"
                    placeholder="Medicacion"
                />
            </div>
            <div className="mt-6">
                <label htmlFor="notas">Notas y observaciones</label>
                <textarea
                    id="notas"
                    type="text"
                    className="w-full min-h-32 bg-bg-primary border-border border px-4 py-3 rounded-lg resize-none"
                    placeholder="Respira con dificultad"
                />
            </div>
            <div className="mt-6 text-xs text-f-secondary grid items-baseline grid-col-1 gap-4 md:gap-0 md:grid-cols-3 ">
                <div className="">
                    <p>Presion Arterial(opcional)</p>
                    <div className="flex items-center gap-1 text-2xl">
                        <input
                            type="text"
                            placeholder="120"
                            className="w-12 text-sm bg-bg-primary border-border border p-1 rounded-lg"
                        />
                        /
                        <input
                            type="text"
                            placeholder="80"
                            className="w-12 text-sm bg-bg-primary border-border border p-1 rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex-row items-center ">
                    <p>Temperatura(opcional)</p>
                    <input
                        type="text"
                        className="bg-bg-primary border-border border p-2 rounded-lg"
                    />
                </div>
                <div>
                    <p>Pulso(opcional)</p>
                    <input
                        type="text"
                        className="bg-bg-primary border-border border p-2 rounded-lg"
                    />
                </div>
            </div>
            <footer className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 font-bold">
                <Button
                    className="w-full md:col-span-2 bg-green-500 "
                    variant="caregivers"
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
