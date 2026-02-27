package com.team19.CareConnect.billing.services;

import com.team19.CareConnect.billing.domain.PaymentReport;
import com.team19.CareConnect.billing.domain.PayrollPeriod;
import com.team19.CareConnect.billing.domain.enums.PaymentReportStatus;
import com.team19.CareConnect.billing.repositories.PaymentReportRepository;
import com.team19.CareConnect.billing.repositories.PayrollPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentReportServiceImpl implements IPaymentReportService {

    private final PaymentReportRepository paymentReportRepository;
    private final PayrollPeriodRepository payrollPeriodRepository;

    // =====================
    // Generate Report
    // =====================
    @Override
    @Transactional
    public PaymentReport generateReport(
            Long payrollPeriodId,
            Long caregiverId,
            Long totalTimeMins) {

        if (payrollPeriodId == null) {
            throw new IllegalArgumentException("payrollPeriodId no puede ser null");
        }
        if (caregiverId == null) {
            throw new IllegalArgumentException("caregiverId no puede ser null");
        }
        if (totalTimeMins == null) {
            throw new IllegalArgumentException("totalTimeMins no puede ser null");
        }

        PayrollPeriod payrollPeriod = payrollPeriodRepository.findById(payrollPeriodId)
                .orElseThrow(() -> new IllegalStateException("PayrollPeriod no encontrado"));

        // Validación de duplicados (refuerza el unique constraint)
        paymentReportRepository
                .findByPayrollPeriodAndCaregiverId(payrollPeriod, caregiverId)
                .ifPresent(r -> {
                    throw new IllegalStateException(
                            "Ya existe un reporte para este cuidador y período");
                });

        BigDecimal totalAmount = calculateAmount(totalTimeMins);

        PaymentReport report = new PaymentReport();
        report.setPayrollPeriod(payrollPeriod);
        report.setCaregiverId(caregiverId);
        report.setTotalTimeMins(totalTimeMins);
        report.setTotalAmount(totalAmount);
        report.setStatus(PaymentReportStatus.GENERATED);
        report.setGeneratedAt(LocalDateTime.now());

        return paymentReportRepository.save(report);
    }

    // =====================
    // Queries
    // =====================
    @Override
    @Transactional(readOnly = true)
    public List<PaymentReport> getReportsByPayrollPeriod(Long payrollPeriodId) {

        if (payrollPeriodId == null) {
            throw new IllegalArgumentException("payrollPeriodId no puede ser null");
        }

        PayrollPeriod payrollPeriod = payrollPeriodRepository.findById(payrollPeriodId)
                .orElseThrow(() -> new IllegalStateException("PayrollPeriod no encontrado"));

        return paymentReportRepository.findByPayrollPeriod(payrollPeriod);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentReport> getReportsByCaregiver(Long caregiverId) {
        return paymentReportRepository.findByCaregiverId(caregiverId);
    }

    // =====================
    // Business Rules
    // =====================
    private BigDecimal calculateAmount(Long totalTimeMins) {
        // 🔧 Hardcode temporal — luego puede venir de configuración
        BigDecimal hourlyRate = BigDecimal.valueOf(10_000); // ejemplo

        BigDecimal hours = BigDecimal.valueOf(totalTimeMins)
                .divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);

        return hourlyRate.multiply(hours);
    }
}