package com.team19.CareConnect.billing.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team19.CareConnect.billing.domain.*;
import com.team19.CareConnect.billing.domain.enums.PaymentReportStatus;

public interface PaymentReportRepository extends JpaRepository<PaymentReport, Long> {
    Optional<PaymentReport> findByPayrollPeriodAndCaregiverId(
            PayrollPeriod payrollPeriod,
            Long caregiverId
    );

    List<PaymentReport> findByPayrollPeriod(PayrollPeriod payrollPeriod);

    List<PaymentReport> findByStatus(PaymentReportStatus status);

    List<PaymentReport> findByCaregiverId(Long caregiverId);

}