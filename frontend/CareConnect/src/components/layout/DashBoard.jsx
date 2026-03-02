import { User } from "lucide-react";
import Patient from "../common/Patient";
const DashBoard = ({ rol, patients, activeId, setActiveId }) => {
    return (
        <div className=" w-full p-4 bg-bg-secondary border border-border rounded-lg">
            <div className="mb-5 flex gap-3">
                <User />
                <h3 className="text-xl font-heading  font-semibold ">
                    Paciente
                </h3>
            </div>
            <ul className="gap-1">
                {patients.map((patient) => (
                    <Patient
                        name={patient.name}
                        age={patient.age}
                        estable={patient.estable}
                        key={patient.id}
                        isActive={patient.id === activeId}
                        onClick={() => setActiveId(patient.id)}
                        rol={rol}
                    />
                ))}
            </ul>
        </div>
    );
};

export default DashBoard;
