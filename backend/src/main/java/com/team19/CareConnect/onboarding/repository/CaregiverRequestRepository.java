package com.team19.CareConnect.onboarding.repository;

import com.team19.CareConnect.onboarding.domain.CaregiverRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaregiverRequestRepository extends JpaRepository<CaregiverRequest, Long> {
}
