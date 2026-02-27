package com.team19.CareConnect.billing.controllers;

import com.team19.CareConnect.billing.domain.PayrollPeriod;
import com.team19.CareConnect.billing.dto.request.CreatePayrollPeriodRequest;
import com.team19.CareConnect.billing.dto.response.PayrollPeriodResponse;
import com.team19.CareConnect.billing.services.PayrollPeriodServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/payroll-periods")
public class PayrollPeriodController {

    @Autowired
    private PayrollPeriodServiceImpl payrollPeriodService;

    @PostMapping
    public ResponseEntity<PayrollPeriodResponse> create(
            @RequestBody CreatePayrollPeriodRequest request
    ) {
        PayrollPeriod period = payrollPeriodService.createPeriod(
                request.getMonth(),
                request.getStartDate(),
                request.getEndDate()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(period));
    }

    @GetMapping("/{id}")
    public PayrollPeriodResponse getById(@PathVariable Long id) {
        return toResponse(payrollPeriodService.getById(id));
    }

    @GetMapping
    public List<PayrollPeriodResponse> getAll() {
        return payrollPeriodService.getAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @PatchMapping("/{id}/open")
    public PayrollPeriodResponse open(@PathVariable Long id) {
        return toResponse(payrollPeriodService.openPeriod(id));
    }

    @PatchMapping("/{id}/close")
    public PayrollPeriodResponse close(@PathVariable Long id) {
        return toResponse(payrollPeriodService.closePeriod(id));
    }

    /* =======================
       Mapper manual
       ======================= */
    private PayrollPeriodResponse toResponse(PayrollPeriod period) {
        return new PayrollPeriodResponse(
                period.getId(),
                period.getMonth(),
                period.getStartDate(),
                period.getEndDate(),
                period.isOpen()
        );
    }
}