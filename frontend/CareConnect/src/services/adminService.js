import { apiFetch } from "./api";

/**
 * adminService – Admin module endpoints.
 * Only defines API calls; no state, no side effects, no notifications.
 */

// ---------------------------------------------------------------------------
// Helpers – transform backend shapes into frontend shapes.
// These transformations live ONLY in the service layer.
// ---------------------------------------------------------------------------

/**
 * Calculate age in years from an ISO date string (YYYY-MM-DD).
 * @param {string|null} birthDate
 * @returns {number|string}
 */
const calcAge = (birthDate) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};

/**
 * Transform a backend caregiver (GET /api/v1/admin/caregiver) into the frontend shape.
 * Note: CBU and workedHours are not returned by the GET endpoint yet.
 * @param {Object} c - Raw caregiver from backend.
 * @returns {{ id: string, fullName: string, dni: string, cbu: string, workedHours: number, status: string }}
 */
const transformCaregiver = (c) => ({
    id: c.caregiverDni ?? String(Math.random()),
    fullName: `${c.firstName} ${c.lastName}`.trim(),
    dni: c.caregiverDni ?? "-",
    // billingInformation does not include CBU/CVU in current GET response
    cbu: c.billingInformation?.cbu ?? "-",
    // workedHours is not yet returned by this endpoint
    workedHours: c.workedHours ?? 0,
    status: c.caregiverStatus ?? "Activo",
});

/**
 * Transform a backend patient (GET /api/v1/admin/patient) into the frontend shape.
 * @param {Object} p - Raw patient from backend.
 * @returns {{ id: number, fullName: string, age: number|string, dni: string, representative: string, status: string }}
 */
const transformPatient = (p) => {
    return {
        id: p.patientId,
        fullName: `${p.firstName} ${p.lastName}`.trim(),
        age: calcAge(p.birthDate),
        email: p.email ?? "-",
        phone: p.phoneNumber ?? "-",
        status: p.patientStatus ?? "Activo",
    };
};



/**
 * Transform a backend CaregiverReportResponse into the frontend report shape.
 * @param {Object} raw - Raw report from the backend.
 * @returns {Object} Transformed report for UI consumption.
 */
const transformReport = (raw) => {
    const hasVitals = raw.bloodPressure || raw.temperature || raw.pulse;

    return {
        id: raw.reportId,
        type: raw.reportContent
            ? raw.reportContent.split(" ").slice(0, 3).join(" ")
            : "Reporte",
        caregiver: raw.caregiverName,
        patient: raw.patientName,
        date: raw.reportDateStart,
        dateEnd: raw.reportDateEnd,
        time: raw.createdAt
            ? new Date(raw.createdAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
            : "",
        notes: raw.reportContent,
        observations: raw.observations || null,
        status: (raw.status || "pending").toLowerCase(),
        vitals: hasVitals
            ? {
                presion: raw.bloodPressure ? `${raw.bloodPressure} mmHg` : "—",
                temperatura: raw.temperature ? `${raw.temperature}°C` : "—",
                pulso: raw.pulse ? `${raw.pulse} bpm` : "—",
            }
            : null,
        documents: raw.documents || [],
    };
};

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
     * Fetch all caregivers from the backend.
     * @returns {Promise<Array<{ id: string, fullName: string, dni: string, cbu: string, workedHours: number, status: string }>>}
     */
    getCaregivers: async () => {
        const raw = await apiFetch("/api/v1/admin/caregiver");
        return raw.map(transformCaregiver);
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
     * Fetch all patients from the backend.
     * @returns {Promise<Array<{ id: number, fullName: string, age: number|string, dni: string, representative: string, status: string }>>}
     */
    getPatients: async () => {
        const raw = await apiFetch("/api/v1/admin/patient");
        return raw.map(transformPatient);
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
     * Fetch all caregiver reports from the backend.
     * Transforms backend CaregiverReportResponse into frontend shape.
     * @returns {Promise<Array<{
     *   id: number,
     *   type: string,
     *   caregiver: string,
     *   patient: string,
     *   date: string,
     *   dateEnd: string,
     *   time: string,
     *   notes: string,
     *   observations: string | null,
     *   status: 'pending' | 'approved' | 'rejected',
     *   vitals: { presion: string, temperatura: string, pulso: string } | null,
     *   documents: Array
     * }>>}
     */
    getReports: async () => {
        const raw = await apiFetch("/api/reports");
        return raw.map(transformReport);
    },

    /**
     * Approve a report by changing its status to APPROVED.
     * @param {number} id - Report ID.
     * @returns {Promise<Object>} Updated report from backend.
     */
    approveReport: async (id) => {
        return apiFetch(`/api/reports/${id}/status?status=APPROVED`, { method: "PATCH" });
    },

    /**
     * Reject a report by changing its status to REJECTED.
     * @param {number} id - Report ID.
     * @returns {Promise<Object>} Updated report from backend.
     */
    rejectReport: async (id) => {
        return apiFetch(`/api/reports/${id}/status?status=REJECTED`, { method: "PATCH" });
    },

    // ---------------------------------------------------------------------------
    // Users – aggregates Admins + Caregivers + Patients into one unified list.
    // ---------------------------------------------------------------------------

    /**
     * Fetch all users by merging three backend endpoints in parallel.
     * Normalizes each backend shape into { id, name, email, role, status }.
     *
     * Sources:
     *  - GET /api/v1/admin/me          → role "Admin"
     *  - GET /api/v1/admin/caregiver   → role "Cuidador"
     *  - GET /api/v1/admin/patient     → role "Paciente"
     *
     * @returns {Promise<Array<{ id: string, name: string, email: string, role: string, status: string }>>}
     */
    getUsers: async () => {
        const [admins, caregivers, patients] = await Promise.all([
            apiFetch("/api/v1/admin/me"),
            apiFetch("/api/v1/admin/caregiver"),
            apiFetch("/api/v1/admin/patient"),
        ]);

        /** @param {Object} a - Raw admin object from backend */
        const transformAdmin = (a, index) => ({
            id: `admin-${index}`,
            name: `${a.firstName} ${a.lastName}`.trim(),
            email: a.email,
            role: "Admin",
            status: "Activo",
        });

        /** @param {Object} c - Raw caregiver object from backend */
        const transformCaregiver = (c) => ({
            id: `cg-${c.caregiverDni}`,
            name: `${c.firstName} ${c.lastName}`.trim(),
            email: c.email,
            role: "Cuidador",
            // caregiverStatus is not returned by GET, default to Activo
            status: c.caregiverStatus ?? "Activo",
        });

        /** @param {Object} p - Raw patient object from backend */
        const transformPatient = (p) => ({
            id: `p-${p.patientId}`,
            name: `${p.firstName} ${p.lastName}`.trim(),
            email: p.email,
            role: "Paciente",
            // patientStatus is not returned by GET, default to Activo
            status: p.patientStatus ?? "Activo",
        });

        return [
            ...admins.map(transformAdmin),
            ...caregivers.map(transformCaregiver),
            ...patients.map(transformPatient),
        ];
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