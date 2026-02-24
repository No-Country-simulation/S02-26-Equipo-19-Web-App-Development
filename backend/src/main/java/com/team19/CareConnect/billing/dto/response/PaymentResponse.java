package com.team19.CareConnect.billing.dto.response;

import com.team19.CareConnect.billing.domain.enums.PaymentMethod;
import com.team19.CareConnect.billing.domain.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PaymentResponse {

    private Long id;
    private Long paymentReportId;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private LocalDateTime initiatedAt;
    private LocalDateTime completedAt;
    private String transactionReference;
}