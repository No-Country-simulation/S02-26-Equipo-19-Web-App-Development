package com.team19.CareConnect.billing.controllers;

import com.team19.CareConnect.billing.domain.PaymentReport;
import com.team19.CareConnect.billing.dto.request.GeneratePaymentReportRequest;
import com.team19.CareConnect.billing.dto.response.PaymentReportResponse;
import com.team19.CareConnect.billing.services.PaymentReportServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/payment-reports")
public class PaymentReportController {

        @Autowired
        private PaymentReportServiceImpl paymentReportService;

        @PostMapping
        public ResponseEntity<PaymentReportResponse> generateReport(
                        @RequestBody GeneratePaymentReportRequest request) {
                PaymentReport report = paymentReportService.generateReport(
                                request.getPayrollPeriodId(),
                                request.getCaregiverId(),
                                request.getTotalTimeMins());

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(toResponse(report));
        }

        @GetMapping("/caregiver/{caregiverId}")
        public List<PaymentReportResponse> getByCaregiver(
                        @PathVariable Long caregiverId) {
                return paymentReportService.getReportsByCaregiver(caregiverId)
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        @GetMapping("/payroll/{payrollPeriodId}")
        public List<PaymentReportResponse> getByPayrollPeriod(
                        @PathVariable Long payrollPeriodId) {
                return paymentReportService.getReportsByPayrollPeriod(payrollPeriodId)
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        /*
         * =======================
         * Mapper manual
         * =======================
         */
        private PaymentReportResponse toResponse(PaymentReport report) {
                return new PaymentReportResponse(
                                report.getId(),
                                report.getPayrollPeriod().getId(),
                                report.getCaregiverId(),
                                report.getTotalTimeMins(),
                                report.getTotalAmount(),
                                report.getStatus(),
                                report.getGeneratedAt());
        }
}