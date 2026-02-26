package com.team19.CareConnect.billing.repositories;

import com.team19.CareConnect.billing.domain.PayrollPeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface PayrollPeriodRepository extends JpaRepository<PayrollPeriod, Long> {

    /**
     * Buscar período por mes (ej: 2026-02-01)
     */
    Optional<PayrollPeriod> findByMonth(LocalDate month);

    /**
     * Obtener el período abierto actual
     */
    Optional<PayrollPeriod> findByOpenTrue();
}