import Header from "../../components/layout/Header";
import DashBoard from "../../components/layout/DashBoard";
import PatientCard from "../../components/layout/PatientCard";
import { useState } from "react";
const Family = () => {
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
        <>
            <Header rol="family" />
            <main className="p-4 grid gap-4 grid-cols-1 lg:grid-cols-4">
                <aside className="lg:col-span-1">
                    <DashBoard
                        patients={patients}
                        activeId={activeId}
                        setActiveId={setActiveId}
                    />
                </aside>
                <section className="lg:col-span-3">
                    <PatientCard patient={patients[activeId - 1]}/>
                </section>
            </main>
        </>
    );
};
export default Family;
