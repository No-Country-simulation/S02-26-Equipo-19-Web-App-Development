package com.team19.CareConnect.billing.services;

import com.team19.CareConnect.billing.domain.PayrollPeriod;
import com.team19.CareConnect.billing.repositories.PayrollPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PayrollPeriodServiceImpl implements IPayrollPeriodService {

    private final PayrollPeriodRepository payrollPeriodRepository;

    @Override
    @Transactional
    public PayrollPeriod createPeriod(
            LocalDate month,
            LocalDate startDate,
            LocalDate endDate
    ) {

        if (month == null) {
            throw new IllegalArgumentException("month no puede ser null");
        }
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("startDate y endDate son obligatorias");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("startDate no puede ser posterior a endDate");
        }

        // Regla de negocio: solo un período por mes
        payrollPeriodRepository.findByMonth(month)
                .ifPresent(p -> {
                    throw new IllegalStateException(
                            "Ya existe un período de liquidación para el mes indicado"
                    );
                });

        PayrollPeriod period = new PayrollPeriod();
        period.setMonth(month);
        period.setStartDate(startDate);
        period.setEndDate(endDate);
        period.setOpen(true); // por defecto se crea abierto

        return payrollPeriodRepository.save(period);
    }

    @Override
    @Transactional(readOnly = true)
    public PayrollPeriod getById(Long id) {

        if (id == null) {
            throw new IllegalArgumentException("id no puede ser null");
        }

        return payrollPeriodRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("PayrollPeriod no encontrado"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PayrollPeriod> getAll() {
        return payrollPeriodRepository.findAll();
    }

    @Override
    @Transactional
    public PayrollPeriod openPeriod(Long id) {

        PayrollPeriod period = getById(id);

        if (period.isOpen()) {
            return period; // idempotente
        }

        period.setOpen(true);
        return payrollPeriodRepository.save(period);
    }

    @Override
    @Transactional
    public PayrollPeriod closePeriod(Long id) {

        PayrollPeriod period = getById(id);

        if (!period.isOpen()) {
            return period; // idempotente
        }

        period.setOpen(false);
        return payrollPeriodRepository.save(period);
    }
}