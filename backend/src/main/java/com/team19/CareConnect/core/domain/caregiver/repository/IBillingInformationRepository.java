package com.team19.CareConnect.core.domain.caregiver.repository;

import com.team19.CareConnect.core.domain.caregiver.domain.BillingInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBillingInformationRepository extends JpaRepository<BillingInformation, Long> {
    BillingInformation findByCaregiverId(Long caregiverId);
}
