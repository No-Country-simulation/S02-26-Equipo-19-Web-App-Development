package com.team19.CareConnect.core.domain.caregiver.repository;

import com.team19.CareConnect.core.domain.caregiver.domain.PayRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPayRateRepository extends JpaRepository<PayRate, Long> {
}
