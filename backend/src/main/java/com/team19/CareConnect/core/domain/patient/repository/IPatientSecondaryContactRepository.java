package com.team19.CareConnect.core.domain.patient.repository;

import com.team19.CareConnect.core.domain.patient.domain.PatientSecondaryContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPatientSecondaryContactRepository extends JpaRepository<PatientSecondaryContact, Long> {
}
