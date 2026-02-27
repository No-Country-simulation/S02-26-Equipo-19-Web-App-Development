package com.team19.CareConnect.billing.services;

import com.team19.CareConnect.billing.domain.PaymentReport;

import java.util.List;

public interface IPaymentReportService {

    /**
     * Genera un reporte de pago para un cuidador en un período
     */
    PaymentReport generateReport(
            Long payrollPeriodId,
            Long caregiverId,
            Long totalTimeMins
    );

    /**
     * Obtiene reportes por período de nómina
     */
    List<PaymentReport> getReportsByPayrollPeriod(Long payrollPeriodId);

    /**
     * Obtiene reportes por cuidador
     */
    List<PaymentReport> getReportsByCaregiver(Long caregiverId);
}