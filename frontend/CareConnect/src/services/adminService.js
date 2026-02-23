// import { apiFetch } from "./api"; // Uncomment when api.js is ready

/**
 * adminService – Admin module endpoints.
 * Only defines API calls; no state, no side effects, no notifications.
 */
export const adminService = {
    /**
     * Fetch global admin metrics.
     * TODO: replace mock with apiFetch("/admin/metrics") when backend is ready.
     * @returns {Promise<{
     *   totalCaregivers: number,
     *   totalPatients: number,
     *   totalFamilies: number,
     *   pendingReports: number,
     *   pendingPayments: number,
     *   completedPayments: number
     * }>}
     */
    getMetrics: () => {
        // TODO: replace with apiFetch("/admin/metrics") when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    totalCaregivers: 12,
                    totalPatients: 8,
                    totalFamilies: 5,
                    pendingReports: 3,
                    pendingPayments: 4,
                    completedPayments: 27,
                });
            }, 800);
        });
        // return Promise.reject(new Error("test")); // Uncomment to test error handling
    },

    // getCaregivers: () => apiFetch("/admin/caregivers"),

    // createCaregiver: (data) =>
    //   apiFetch("/admin/caregivers", { method: "POST", body: JSON.stringify(data) }),

    // updateCaregiver: (id, data) =>
    //   apiFetch(`/admin/caregivers/${id}`, { method: "PUT", body: JSON.stringify(data) }),

    // deactivateCaregiver: (id) =>
    //   apiFetch(`/admin/caregivers/${id}`, { method: "PATCH" }),

    // getPatients: () => apiFetch("/admin/patients"),

    // getPayments: () => apiFetch("/admin/payments"),

    // executePayment: (id) =>
    //   apiFetch(`/admin/payments/${id}/execute`, { method: "POST" }),
};
