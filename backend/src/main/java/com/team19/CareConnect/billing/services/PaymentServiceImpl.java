package com.team19.CareConnect.billing.services;

import com.team19.CareConnect.billing.domain.Payment;
import com.team19.CareConnect.billing.domain.PaymentReport;
import com.team19.CareConnect.billing.domain.enums.PaymentMethod;
import com.team19.CareConnect.billing.domain.enums.PaymentReportStatus;
import com.team19.CareConnect.billing.domain.enums.PaymentStatus;
import com.team19.CareConnect.billing.repositories.PaymentReportRepository;
import com.team19.CareConnect.billing.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements IPaymentService {

    private final PaymentRepository paymentRepository;
    private final PaymentReportRepository paymentReportRepository;

    // =====================
    // Initiate Payment
    // =====================
    @Override
    @Transactional
    public Payment initiatePayment(Long paymentReportId, PaymentMethod method) {

        PaymentReport report = paymentReportRepository.findById(paymentReportId)
                .orElseThrow(() -> new IllegalStateException("PaymentReport no encontrado"));

        if (report.getStatus() != PaymentReportStatus.GENERATED) {
            throw new IllegalStateException("El reporte no está disponible para pago");
        }

        report.setStatus(PaymentReportStatus.PAYMENT_IN_PROGRESS);

        Payment payment = new Payment();
        payment.setPaymentReport(report);
        payment.setPaymentMethod(method);
        payment.setPaymentStatus(PaymentStatus.CREATED);
        payment.setInitiatedAt(LocalDateTime.now());

        payment.setPaymentStatus(PaymentStatus.INITIATED);

        return paymentRepository.save(payment);
    }

    // =====================
    // Complete Payment
    // =====================
    @Override
    @Transactional
    public void completePayment(Long paymentId, String transactionReference) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalStateException("Pago no encontrado"));

        payment.setPaymentStatus(PaymentStatus.COMPLETED);
        payment.setCompletedAt(LocalDateTime.now());
        payment.setTransactionReference(transactionReference);

        payment.getPaymentReport().setStatus(PaymentReportStatus.PAID);
    }

    // =====================
    // Fail Payment
    // =====================
    @Override
    @Transactional
    public void failPayment(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalStateException("Pago no encontrado"));

        payment.setPaymentStatus(PaymentStatus.FAILED);
        payment.getPaymentReport().setStatus(PaymentReportStatus.PAYMENT_FAILED);
    }

    // =====================
    // Get Payment by ID
    // =====================
    @Override
    @Transactional
    public Payment getById(Long paymentId) {

        if (paymentId == null) {
            throw new IllegalArgumentException("paymentId no puede ser null");
        }

        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalStateException("Payment no encontrado"));
    }

     @Override
    @Transactional
    public List<Payment> getByStatus(PaymentStatus status) {

        if (status == null) {
            throw new IllegalArgumentException("paymentStatus no puede ser null");
        }

        return paymentRepository.findByPaymentStatus(status);
    }
}