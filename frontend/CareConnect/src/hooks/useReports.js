import { useState, useEffect } from "react";
import { adminService } from "../services/adminService";
import { handleError } from "../utils/handleError";

/**
 * useReports – manages server state for the Admin Reports view.
 *
 * Responsibilities:
 *  - Fetch reports on mount.
 *  - Expose loading state.
 *  - Provide mutation handlers (approve, reject).
 *  - After every mutation → refetch (source of truth is always the service).
 *
 * Does NOT:
 *  - Manipulate arrays manually.
 *  - Use Zustand.
 *  - Perform async operations outside this hook (Page stays clean).
 *
 * @returns {{
 *   reports: Array<{
 *     id: string,
 *     type: string,
 *     caregiver: string,
 *     patient: string,
 *     date: string,
 *     time: string,
 *     notes: string,
 *     status: 'pending' | 'approved' | 'rejected',
 *     vitals?: { presion: string, temperatura: string, pulso: string }
 *   }>,
 *   loading: boolean,
 *   approveReport: (id: string) => Promise<void>,
 *   rejectReport: (id: string) => Promise<void>,
 *   refetch: () => Promise<void>
 * }}
 */
export const useReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    // Core fetch – always pulls from the service, never patches local state.
    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await adminService.getReports();
            setReports(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount
    useEffect(() => {
        fetchReports();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * Approve a report and refresh the list.
     * @param {string} id
     */
    const approveReport = async (id) => {
        try {
            await adminService.approveReport(id);
            await fetchReports();
        } catch (error) {
            handleError(error);
        }
    };

    /**
     * Reject a report and refresh the list.
     * @param {string} id
     */
    const rejectReport = async (id) => {
        try {
            await adminService.rejectReport(id);
            await fetchReports();
        } catch (error) {
            handleError(error);
        }
    };

    return {
        reports,
        loading,
        approveReport,
        rejectReport,
        refetch: fetchReports,
    };
};
