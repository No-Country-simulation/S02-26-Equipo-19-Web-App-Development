package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.patientreport.domain.CaregiverReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public  interface CaregiverReportRepository extends JpaRepository<CaregiverReport, Long> {

    List<CaregiverReport> findByPatientCaregiver_Id(Long patientCaregiverId);
}
