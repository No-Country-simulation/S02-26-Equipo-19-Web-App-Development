import { useState, useEffect, useCallback } from "react";
import { adminService } from "../services/adminService";
import { handleError } from "../utils/handleError";

/**
 * useCaregivers – manages server state for the Admin Caregivers view.
 *
 * Responsibilities:
 *  - Fetch caregivers on mount.
 *  - Expose loading state.
 *  - Provide mutation handlers (create, update, deactivate).
 *  - After every mutation → refetch (source of truth is always the service).
 *
 * Does NOT:
 *  - Manipulate arrays manually.
 *  - Unify data from multiple tables (that's the service's job).
 *  - Use Zustand.
 *  - Perform async operations outside this hook (Page stays clean).
 *
 * @returns {{
 *   caregivers: Array<{ id: string, fullName: string, dni: string, cbu: string, workedHours: number, status: string }>,
 *   loading: boolean,
 *   createCaregiver: (data: object) => Promise<void>,
 *   updateCaregiver: (id: string, data: object) => Promise<void>,
 *   deactivateCaregiver: (id: string) => Promise<void>,
 *   refetch: () => Promise<void>
 * }}
 * @note `cbu` defaults to "-" and `workedHours` to 0 since the GET /api/v1/admin/caregiver
 *       endpoint does not return those fields currently.
 */
export const useCaregivers = () => {
    const [caregivers, setCaregivers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Core fetch – always pulls from the service, never patches local state.
    const fetchCaregivers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getCaregivers();
            setCaregivers(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchCaregivers();
    }, [fetchCaregivers]);

    /**
     * Create a new caregiver and refresh the list.
     * @param {{ fullName: string, dni: string, cbu: string }} formData
     */
    const createCaregiver = async (formData) => {
        try {
            await adminService.createCaregiver(formData);
            await fetchCaregivers();
        } catch (error) {
            handleError(error);
        }
    };

    /**
     * Update an existing caregiver and refresh the list.
     * @param {string} id
     * @param {{ fullName?: string, dni?: string, cbu?: string }} formData
     */
    const updateCaregiver = async (id, formData) => {
        try {
            await adminService.updateCaregiver(id, formData);
            await fetchCaregivers();
        } catch (error) {
            handleError(error);
        }
    };

    /**
     * Deactivate a caregiver and refresh the list.
     * @param {string} id
     */
    const deactivateCaregiver = async (id) => {
        try {
            await adminService.deactivateCaregiver(id);
            await fetchCaregivers();
        } catch (error) {
            handleError(error);
        }
    };

    return {
        caregivers,
        loading,
        createCaregiver,
        updateCaregiver,
        deactivateCaregiver,
        refetch: fetchCaregivers,
    };
};
