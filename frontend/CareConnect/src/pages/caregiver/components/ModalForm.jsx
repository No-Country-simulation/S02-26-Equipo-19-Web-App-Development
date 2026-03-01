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
            className={`${clasesCentrado} min-w-11/12  p-5 shadow-lg rounded-lg ${isOpen ? null : "hidden"} text-f-primary font-body`}
        >
            <div className="display flex items-baseline justify-between">
                <h4 className="font-heading text-xl font-medium ">Nuevo Reporte</h4>
                <p className="font-base">Para: pepe</p>
            </div>
            <div className="mt-6">
                <label htmlFor="">Tipo de Actividad</label>
                <input
                    type="text"
                    className="w-full bg-bg-primary border-border border p-3 rounded-lg"
                    placeholder="Medicacion"
                />
            </div>
            <div>
                <label htmlFor="">Notas y observaciones</label>
                <input
                    type="text"
                    className="w-full bg-bg-primary border-border border p-3 rounded-lg"
                    placeholder="Respira con dificultad"
                />
            </div>
            <div className="flex items-baseline justify-between">
                <div className="">
                    <p>Presion Arterial(opcional)</p>
                    <div>
                        <input type="text" />
                        /
                        <input type="text" />
                    </div>
                </div>
                <div className="">
                    <p>Temperatura(opcional)</p>
                    <input type="text" />
                </div>
                <div>
                    <p>Pulso(opcional)</p>
                    <input type="text" />
                </div>
            </div>
            <footer className="grid grid-cols-3">
                <Button className="w-full col-span-2 bg-green-500">
                    EnviarReporte
                </Button>
                <Button
                    className="w-full col-span-1"
                    onClick={() => setOpen(false)}
                >
                    Cancelar
                </Button>
            </footer>
        </form>
    );
};
export default ModalForm;
