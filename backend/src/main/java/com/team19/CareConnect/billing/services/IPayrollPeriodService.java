package com.team19.CareConnect.billing.services;

import com.team19.CareConnect.billing.domain.PayrollPeriod;

import java.time.LocalDate;
import java.util.List;

public interface IPayrollPeriodService {

    PayrollPeriod createPeriod(LocalDate month, LocalDate startDate, LocalDate endDate);

    PayrollPeriod getById(Long id);

    List<PayrollPeriod> getAll();

    PayrollPeriod openPeriod(Long id);

    PayrollPeriod closePeriod(Long id);
}