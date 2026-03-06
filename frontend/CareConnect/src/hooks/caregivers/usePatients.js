import { useEffect, useState } from "react";

export const usePatients = (id) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/patient-caregiver/caregiver/${id}/patients`
                );

                const data = await res.json();
                console.log(data);

                setPatients(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPatients();
    }, [id]);

    return patients;
};