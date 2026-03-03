package com.team19.CareConnect.billing.dto.request;

import com.team19.CareConnect.billing.domain.enums.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentRequest {

    private Long paymentReportId;
    private PaymentMethod paymentMethod;
}