package com.team19.CareConnect.billing.domain.enums;

public enum PaymentStatus {

    /**
     * Pago creado pero no enviado a la pasarela
     */
    CREATED,

    /**
     * Enviado a la pasarela (Mercado Pago, banco, etc.)
     */
    INITIATED,

    /**
     * Pago confirmado por la pasarela
     */
    COMPLETED,

    /**
     * Pago rechazado o fallido
     */
    FAILED
}