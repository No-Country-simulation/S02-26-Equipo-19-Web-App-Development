package com.team19.CareConnect.billing.controllers;

import com.team19.CareConnect.billing.domain.Payment;
import com.team19.CareConnect.billing.domain.enums.PaymentStatus;
import com.team19.CareConnect.billing.dto.request.CreatePaymentRequest;
import com.team19.CareConnect.billing.dto.response.PaymentResponse;
import com.team19.CareConnect.billing.services.PaymentServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/payments")
public class PaymentController {

    @Autowired
    private PaymentServiceImpl paymentService;

    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(
            @RequestBody CreatePaymentRequest request
    ) {
        Payment payment = paymentService.initiatePayment(
                request.getPaymentReportId(),
                request.getPaymentMethod()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(payment));
    }

    @GetMapping("/{paymentId}")
    public PaymentResponse getById(@PathVariable Long paymentId) {
        return toResponse(paymentService.getById(paymentId));
    }

    @GetMapping
    public List<PaymentResponse> getByStatus(
            @RequestParam PaymentStatus status
    ) {
        return paymentService.getByStatus(status)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /* =======================
       Mapper manual
       ======================= */
    private PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getPaymentReport().getId(),
                payment.getPaymentMethod(),
                payment.getPaymentStatus(),
                payment.getInitiatedAt(),
                payment.getCompletedAt(),
                payment.getTransactionReference()
        );
    }
}