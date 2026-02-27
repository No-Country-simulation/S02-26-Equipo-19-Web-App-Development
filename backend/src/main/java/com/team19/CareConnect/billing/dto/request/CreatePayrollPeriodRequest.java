package com.team19.CareConnect.billing.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreatePayrollPeriodRequest {

    private LocalDate month;
    private LocalDate startDate;
    private LocalDate endDate;
}