package com.team19.CareConnect.billing.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneratePaymentReportRequest {

    private Long payrollPeriodId;
    private Long caregiverId;
    private Long totalTimeMins;
}