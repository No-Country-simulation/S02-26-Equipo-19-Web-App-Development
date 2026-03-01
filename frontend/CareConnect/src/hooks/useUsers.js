import { useState, useEffect, useCallback } from "react";
import { adminService } from "../services/adminService";
import { handleError } from "../utils/handleError";

/**
 * useUsers – manages server state for the Admin Users view.
 *
 * Responsibilities:
 *  - Fetch users on mount.
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
 *   users: Array<{ id: string, name: string, email: string, role: string, status: string }>,
 *   loading: boolean,
 *   createUser: (data: object) => Promise<void>,
 *   updateUser: (id: string, data: object) => Promise<void>,
 *   deactivateUser: (id: string) => Promise<void>,
 *   refetch: () => Promise<void>
 * }}
 */
export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Core fetch – always pulls from the service, never patches local state.
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    /**
     * Create a new user and refresh the list.
     * @param {object} formData
     */
    const createUser = async (formData) => {
        try {
            await adminService.createUser(formData);
            await fetchUsers();
        } catch (error) {
            handleError(error);
        }
    };

    /**
     * Update an existing user and refresh the list.
     * @param {string} id
     * @param {object} formData
     */
    const updateUser = async (id, formData) => {
        try {
            await adminService.updateUser(id, formData);
            await fetchUsers();
        } catch (error) {
            handleError(error);
        }
    };

    /**
     * Deactivate a user and refresh the list.
     * @param {string} id
     */
    const deactivateUser = async (id) => {
        try {
            await adminService.deactivateUser(id);
            await fetchUsers();
        } catch (error) {
            handleError(error);
        }
    };

    return {
        users,
        loading,
        createUser,
        updateUser,
        deactivateUser,
        refetch: fetchUsers,
    };
};
