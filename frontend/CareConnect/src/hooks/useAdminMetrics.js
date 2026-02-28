import { useState, useEffect } from "react";
import { adminService } from "../services/adminService";
import { handleError } from "../utils/handleError";

/**
 * useAdminMetrics – fetches admin dashboard metrics on mount.
 * Manages loading and error state internally.
 * No render logic.
 *
 * @returns {{ metrics: object|null, loading: boolean }}
 */
export const useAdminMetrics = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await adminService.getMetrics();
                setMetrics(data);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return { metrics, loading };
};
