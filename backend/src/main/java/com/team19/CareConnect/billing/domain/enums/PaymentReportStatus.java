package com.team19.CareConnect.billing.domain.enums;

public enum PaymentReportStatus {

    /**
     * Reporte generado pero no pagado
     */
    GENERATED,

    /**
     * Pago iniciado (se creó el Payment)
     */
    PAYMENT_IN_PROGRESS,

    /**
     * Pago completado correctamente
     */
    PAID,

    /**
     * Error durante el proceso de pago
     */
    PAYMENT_FAILED,

    /**
     * Reporte anulado (corrección manual, error, etc.)
     */
    CANCELLED
}