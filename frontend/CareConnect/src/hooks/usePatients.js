import { useState, useEffect, useCallback } from "react";
import { adminService } from "../services/adminService";
import { handleError } from "../utils/handleError";

/**
 * usePatients – manages server state for the Admin Patients view.
 *
 * Responsibilities:
 *  - Fetch patients on mount.
 *  - Expose loading state.
 *  - Provide mutation handlers (create, update, deactivate).
 *  - After every mutation → refetch (source of truth is always the service).
 *
 * Does NOT:
 *  - Manipulate arrays manually.
 *  - Use Zustand.
 *  - Perform async operations outside this hook (Page stays clean).
 *
 * @returns {{
 *   patients: Array<{ id: number, fullName: string, age: number|string, dni: string, representative: string, status: string }>,
 *   loading: boolean,
 *   createPatient: (data: object) => Promise<void>,
 *   updatePatient: (id: number, data: object) => Promise<void>,
 *   deactivatePatient: (id: number) => Promise<void>,
 *   refetch: () => Promise<void>
 * }}
 */
export const usePatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Core fetch – always pulls from the service, never patches local state.
    const fetchPatients = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getPatients();
            setPatients(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    /**
     * Create a new patient and refresh the list.
     * @param {{ fullName: string, age: number, dni: string, representative?: string }} formData
     */
    const createPatient = async (formData) => {
        try {
            await adminService.createPatient(formData);
            await fetchPatients();
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    return {
        patients,
        loading,
        createPatient,
        refetch: fetchPatients,
    };
};
