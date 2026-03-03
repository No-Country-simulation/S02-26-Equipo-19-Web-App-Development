package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.patientreport.domain.CaregiverReport;
import com.team19.CareConnect.patientreport.domain.ReportStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public  interface CaregiverReportRepository extends JpaRepository<CaregiverReport, Long> {

//    List<CaregiverReport> findByPatientCaregiver_Id(Long patientCaregiverId);


   //para family-reporte pacinte
    List<CaregiverReport> findByPatientCaregiver_Patient_IdAndStatus(
            Long patientId, ReportStatus status);

    //para cuidador -reportes
    List<CaregiverReport> findByPatientCaregiver_Caregiver_Id(Long caregiverId);

    //cuidador -reporte de un paciente especifico
    List<CaregiverReport> findByPatientCaregiver_Caregiver_IdAndPatientCaregiver_Patient_Id(
            Long caregiverId, Long patientId);
}
