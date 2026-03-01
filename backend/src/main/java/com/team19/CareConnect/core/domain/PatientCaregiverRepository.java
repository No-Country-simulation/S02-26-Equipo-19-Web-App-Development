package com.team19.CareConnect.core.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PatientCaregiverRepository extends JpaRepository<PatientCaregiver, Long> {
    List<PatientCaregiver> findByCaregiver_Id(Long caregiverId);



}