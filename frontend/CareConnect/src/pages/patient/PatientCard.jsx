import { User } from "lucide-react";
import Patient from "../../components/common/Patient";
import { useState } from "react";
const PatientCard = () => {
    const [activeId, setActiveId] = useState(1);
    const patients = [
        {
            id: 1,
            name: "Maria Garcia",
            age: "60",
            estable: true,
        },
        { id: 2, name: "Pepe", age: "70", estable: false },
    ];
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
                    />
                ))}
            </ul>
        </div>
    );
};

export default PatientCard;
