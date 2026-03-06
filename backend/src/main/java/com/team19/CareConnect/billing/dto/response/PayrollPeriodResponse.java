package com.team19.CareConnect.billing.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class PayrollPeriodResponse {

    private Long id;
    private LocalDate month;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean open;
}