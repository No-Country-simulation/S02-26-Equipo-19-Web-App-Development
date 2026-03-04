// ---------------------------------------------------------------------------
// api.js – Centralized HTTP utility for all API calls.
// ---------------------------------------------------------------------------

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Wrapper around `fetch` that:
 *  - Prefixes the base URL.
 *  - Adds JSON content-type and Authorization header (if token exists).
 *  - Throws a descriptive Error on non-OK responses.
 *  - Parses JSON automatically (returns null for 204 No Content).
 *
 * @param {string} endpoint - Path starting with "/", e.g. "/api/reports".
 * @param {RequestInit} [options={}] - Standard fetch options (method, body, etc.).
 * @returns {Promise<any>} Parsed JSON response.
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // No-content responses (e.g. 204)
    if (response.status === 204) {
        return null;
    }

    // Non-OK responses → throw with backend message when available
    if (!response.ok) {
        let errorMessage = `Error ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message || errorBody.error || errorMessage;
        } catch {
            // response body is not JSON – keep generic message
        }
        throw new Error(errorMessage);
    }

    return response.json();
};
