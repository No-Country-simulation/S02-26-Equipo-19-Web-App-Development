package com.team19.CareConnect.core.domain.patient.repository;

import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IGuardianRepository extends JpaRepository<Guardian, Long> {
}
