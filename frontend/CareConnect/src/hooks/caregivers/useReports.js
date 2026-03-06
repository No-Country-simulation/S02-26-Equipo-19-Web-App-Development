import { useEffect, useState } from "react";

export const useReports = (caregiverId, activeId) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {

        if (!caregiverId || !activeId) return;

        const fetchReports = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/reports/caregiver/${caregiverId}`
                );

                const data = await res.json();

                const filteredReports = data.filter(
                    report => report.patientCaregiverId === activeId
                );

                setReports(filteredReports);

            } catch (err) {
                console.error(err);
            }
        };

        fetchReports();

    }, [caregiverId, activeId]);

    return reports;
};