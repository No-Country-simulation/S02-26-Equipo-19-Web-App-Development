import { toast } from "react-toastify";

/**
 * Centralized error handler for all API calls.
 * Never exposes raw backend errors to the UI.
 * @param {unknown} error - The caught error object.
 * @param {string} [fallbackMessage] - Optional custom fallback message.
 */
export const handleError = (error, fallbackMessage = "Ocurrió un error inesperado") => {
    const message =
        error instanceof Error ? error.message : fallbackMessage;

    toast.error(message);
};
