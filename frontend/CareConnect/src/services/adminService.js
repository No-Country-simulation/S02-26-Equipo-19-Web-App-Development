// import { apiFetch } from "./api"; // Uncomment when api.js is ready

/**
 * adminService – Admin module endpoints.
 * Only defines API calls; no state, no side effects, no notifications.
 */

// ---------------------------------------------------------------------------
// Internal mock data – simulates two separate DB tables.
// These mocks live ONLY in the service layer.
// The Page and the Hook must never know about this separation.
// ---------------------------------------------------------------------------

/** Mock: Table 1 – caregiver base data (fullName, dni, cbu) */
const mockCaregiversBase = [
    { id: "c1", fullName: "Pedro Martinez", dni: "25123456", cbu: "0000003100012345678901", status: "Activo" },
    { id: "c2", fullName: "Ana Garcia", dni: "28654321", cbu: "0000003100098765432109", status: "Activo" },
    { id: "c3", fullName: "Lucas Rodriguez", dni: "30987654", cbu: "0000003100045612378904", status: "Inactivo" },
    { id: "c4", fullName: "Maria Lopez", dni: "22111222", cbu: "0000003100078945612307", status: "Activo" },
];

/** Mock: Table 2 – worked hours per caregiver (keyed by caregiver id) */
const mockWorkedHours = {
    c1: 45,
    c2: 32,
    c3: 0,
    c4: 50,
};

/** Mock: Table 3 – Caregiver reports (mutable for simulation) */
let mockReports = [
    {
        id: "r1",
        type: "Medicacion",
        caregiver: "Ana Garcia",
        patient: "Roberto Gómez",
        date: "2026-02-08",
        time: "8:00",
        notes: "Medicación matutina administrada correctamente. Paciente se encuentra en buen estado de ánimo.",
        status: "pending",
        vitals: { presion: "120/80 mmHg", temperatura: "36.5°C", pulso: "72 bpm" },
    },
    {
        id: "r2",
        type: "Control General",
        caregiver: "Pedro Martinez",
        patient: "Laura Martinez",
        date: "2026-02-09",
        time: "10:30",
        notes: "Control de rutina realizado. El paciente descansó bien durante la noche.",
        status: "pending",
        vitals: { presion: "130/85 mmHg", temperatura: "37.0°C", pulso: "80 bpm" },
    },
    {
        id: "r3",
        type: "Higiene y Aseo",
        caregiver: "Maria Lopez",
        patient: "Ana Rodríguez",
        date: "2026-02-10",
        time: "9:00",
        notes: "Aseo personal completo. Sin novedades durante la guardia.",
        status: "approved",
        vitals: null,
    },
    {
        id: "r4",
        type: "Alimentacion",
        caregiver: "Lucas Rodriguez",
        patient: "Carlos López",
        date: "2026-02-11",
        time: "13:00",
        notes: "Paciente rechazó la comida al mediodía. Se informó a la familia.",
        status: "rejected",
        vitals: { presion: "110/70 mmHg", temperatura: "36.8°C", pulso: "68 bpm" },
    },
    {
        id: "r5",
        type: "Medicacion",
        caregiver: "Ana Garcia",
        patient: "Roberto Gómez",
        date: "2026-02-12",
        time: "20:00",
        notes: "Medicación nocturna administrada sin inconvenientes. Paciente dormido.",
        status: "pending",
        vitals: { presion: "118/76 mmHg", temperatura: "36.3°C", pulso: "70 bpm" },
    },
];

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
    },

    // ---------------------------------------------------------------------------
    // Caregivers
    // ---------------------------------------------------------------------------

    /**
     * Fetch all caregivers.
     * Merges base data (Table 1) with worked hours (Table 2) before returning.
     * TODO: replace with apiFetch("/admin/caregivers") when backend is ready.
     * @returns {Promise<Array<{ id: string, fullName: string, dni: string, cbu: string, workedHours: number }>>}
     */
    getCaregivers: () => {
        // TODO: replace with apiFetch("/admin/caregivers") when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                // Merge: join the two mock tables on caregiver id
                const unified = mockCaregiversBase.map((caregiver) => ({
                    ...caregiver,
                    workedHours: mockWorkedHours[caregiver.id] ?? 0,
                }));
                resolve(unified);
            }, 800);
        });
    },

    /**
     * Create a new caregiver.
     * TODO: replace with apiFetch("/admin/caregivers", { method: "POST", body: JSON.stringify(data) })
     * @param {{ fullName: string, dni: string, cbu: string }} data
     * @returns {Promise<void>}
     */
    createCaregiver: (data) => {
        // TODO: replace with apiFetch("/admin/caregivers", { method: "POST", body: JSON.stringify(data) })
        return new Promise((resolve) => {
            setTimeout(() => {
                // In real impl, backend handles persistence; mock just resolves
                resolve();
            }, 600);
        });
    },

    /**
     * Update an existing caregiver.
     * TODO: replace with apiFetch(`/admin/caregivers/${id}`, { method: "PUT", body: JSON.stringify(data) })
     * @param {string} id
     * @param {{ fullName?: string, dni?: string, cbu?: string }} data
     * @returns {Promise<void>}
     */
    updateCaregiver: (id, data) => {
        // TODO: replace with apiFetch(`/admin/caregivers/${id}`, { method: "PUT", body: JSON.stringify(data) })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    },

    /**
     * Deactivate a caregiver (soft delete / status change).
     * TODO: replace with apiFetch(`/admin/caregivers/${id}`, { method: "PATCH" })
     * @param {string} id
     * @returns {Promise<void>}
     */
    deactivateCaregiver: (id) => {
        // TODO: replace with apiFetch(`/admin/caregivers/${id}`, { method: "PATCH" })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    },

    // ---------------------------------------------------------------------------
    // Patients
    // ---------------------------------------------------------------------------

    /**
     * Fetch all patients.
     * TODO: replace mock with apiFetch("/admin/patients") when backend is ready.
     * @returns {Promise<Array<{ id: string, fullName: string, age: number, dni: string, representative: string, status: string }>>}
     */
    getPatients: () => {
        // TODO: replace with apiFetch("/admin/patients") when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: "p1", fullName: "Roberto Gómez", age: 75, dni: "12345678", representative: "Mariana Pérez", status: "Activo" },
                    { id: "p2", fullName: "Laura Martinez", age: 68, dni: "23456789", representative: "-", status: "Activo" },
                    { id: "p3", fullName: "Carlos López", age: 82, dni: "34567890", representative: "Juan Carlos", status: "Inactivo" },
                    { id: "p4", fullName: "Ana Rodríguez", age: 71, dni: "45678901", representative: "-", status: "Activo" },
                ]);
            }, 800);
        });
    },

    /**
     * Create a new patient.
     * TODO: replace with apiFetch("/admin/patients", { method: "POST", body: JSON.stringify(data) })
     * @param {{ fullName: string, age: number, dni: string, representative?: string }} data
     * @returns {Promise<void>}
     */
    createPatient: (data) => {
        // TODO: replace with apiFetch("/admin/patients", { method: "POST", body: JSON.stringify(data) })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    },

    /**
     * Update an existing patient.
     * TODO: replace with apiFetch(`/admin/patients/${id}`, { method: "PUT", body: JSON.stringify(data) })
     * @param {string} id
     * @param {{ fullName?: string, age?: number, dni?: string, representative?: string }} data
     * @returns {Promise<void>}
     */
    updatePatient: (id, data) => {
        // TODO: replace with apiFetch(`/admin/patients/${id}`, { method: "PUT", body: JSON.stringify(data) })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    },

    /**
     * Deactivate a patient (soft delete / status change).
     * TODO: replace with apiFetch(`/admin/patients/${id}`, { method: "PATCH" })
     * @param {string} id
     * @returns {Promise<void>}
     */
    deactivatePatient: (id) => {
        // TODO: replace with apiFetch(`/admin/patients/${id}`, { method: "PATCH" })
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 600);
        });
    },

    // ---------------------------------------------------------------------------
    // Payments (pending backend)
    // ---------------------------------------------------------------------------

    // getPayments: () => apiFetch("/admin/payments"),

    // executePayment: (id) =>
    //   apiFetch(`/admin/payments/${id}/execute`, { method: "POST" }),

    // ---------------------------------------------------------------------------
    // Reports
    // ---------------------------------------------------------------------------

    /**
     * Fetch all caregiver reports.
     * TODO: replace mock with apiFetch("/admin/reports") when backend is ready.
     * @returns {Promise<Array<{
     *   id: string,
     *   type: string,
     *   caregiver: string,
     *   patient: string,
     *   date: string,
     *   time: string,
     *   notes: string,
     *   status: 'pending' | 'approved' | 'rejected',
     *   vitals?: { presion: string, temperatura: string, pulso: string }
     * }>>}
     */
    getReports: () => {
        // TODO: replace with apiFetch("/admin/reports") when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockReports]);
            }, 800);
        });
    },

    /**
     * Approve a report.
     * TODO: replace with apiFetch(`/admin/reports/${id}/approve`, { method: "PATCH" })
     * @param {string} id
     * @returns {Promise<void>}
     */
    approveReport: (id) => {
        // TODO: replace with apiFetch(`/admin/reports/${id}/approve`, { method: "PATCH" })
        return new Promise((resolve) => {
            setTimeout(() => {
                mockReports = mockReports.map(r =>
                    r.id === id ? { ...r, status: 'approved' } : r
                );
                resolve();
            }, 500);
        });
    },

    /**
     * Reject a report.
     * TODO: replace with apiFetch(`/admin/reports/${id}/reject`, { method: "PATCH" })
     * @param {string} id
     * @returns {Promise<void>}
     */
    rejectReport: (id) => {
        // TODO: replace with apiFetch(`/admin/reports/${id}/reject`, { method: "PATCH" })
        return new Promise((resolve) => {
            setTimeout(() => {
                mockReports = mockReports.map(r =>
                    r.id === id ? { ...r, status: 'rejected' } : r
                );
                resolve();
            }, 500);
        });
    },

    // ---------------------------------------------------------------------------
    // Users
    // ---------------------------------------------------------------------------

    /**
     * Fetch all users.
     * TODO: replace mock with apiFetch("/admin/users") when backend is ready.
     * @returns {Promise<Array<{ id: string, name: string, email: string, role: string, status: string }>>}
     */
    getUsers: () => {
        // TODO: replace with apiFetch("/admin/users") when backend is ready
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: "u1", name: "Pablo", email: "pablo@gmail.com", role: "Cuidador", status: "Activo" },
                    { id: "u2", name: "Juan", email: "juan@gmail.com", role: "Admin", status: "Activo" },
                    { id: "u3", name: "Maria", email: "maria@gmail.com", role: "Familia", status: "Inactivo" },
                    { id: "u4", name: "Pedro", email: "pedro@gmail.com", role: "Cuidador", status: "Activo" },
                ]);
            }, 800);
        });
    },

    /**
     * Create a new user.
     * @param {object} data 
     * @returns {Promise<void>}
     */
    createUser: (data) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 600);
        });
    },

    /**
     * Update an existing user.
     * @param {string} id 
     * @param {object} data 
     * @returns {Promise<void>}
     */
    updateUser: (id, data) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 600);
        });
    },

    /**
     * Deactivate a user.
     * @param {string} id 
     * @returns {Promise<void>}
     */
    deactivateUser: (id) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 600);
        });
    },
};