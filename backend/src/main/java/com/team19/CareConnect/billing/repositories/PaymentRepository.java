package com.team19.CareConnect.billing.repositories;

import com.team19.CareConnect.billing.domain.Payment;
import com.team19.CareConnect.billing.domain.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByPaymentReportId(Long paymentReportId);

    List<Payment> findByPaymentStatus(PaymentStatus status);
    
}