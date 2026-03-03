package com.team19.CareConnect.billing.dto.response;

import com.team19.CareConnect.billing.domain.enums.PaymentReportStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PaymentReportResponse {

    private Long id;
    private Long payrollPeriodId;
    private Long caregiverId;
    private Long totalTimeMins;
    private BigDecimal totalAmount;
    private PaymentReportStatus status;
    private LocalDateTime generatedAt;
}