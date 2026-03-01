package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.core.domain.PatientCaregiver;
import com.team19.CareConnect.core.domain.PatientCaregiverRepository;
import com.team19.CareConnect.patientreport.domain.CaregiverReport;
import com.team19.CareConnect.patientreport.domain.ReportStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaregiverReportService {

    private final CaregiverReportRepository reportRepository;

    //ciodador-cargar reportecuidador-cargar reporte
    private final PatientCaregiverRepository patientCaregiverRepository;


    // GET todos los reportes - Admin
    public List<CaregiverReportDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // PATCH cambiar status de reporte- Admin
    public CaregiverReportDTO updateStatus(Long reportId, ReportStatus newStatus) {
        CaregiverReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado: " + reportId));
        report.setStatus(newStatus);
        return toDTO(reportRepository.save(report));
    }

    //familia-reportes ver todos los uq epertenecen al paciente
    public List<CaregiverReportDTO> getApprovedReportsByPatient(Long patientId) {
        return reportRepository
                .findByPatientCaregiver_Patient_IdAndStatus(patientId, ReportStatus.APPROVED)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    //ciodador-reportes ver todos

    public List<CaregiverReportDTO> getReportsByCaregiver(Long caregiverId) {
        return reportRepository
                .findByPatientCaregiver_Caregiver_Id(caregiverId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

//cuidador  crea reporte

    public CaregiverReportDTO createReport(CaregiverReportRequestDTO request) {
        PatientCaregiver patientCaregiver = patientCaregiverRepository.findById(request.patientCaregiverId())
                .orElseThrow(() -> new RuntimeException("PatientCaregiver no encontrado: " + request.patientCaregiverId()));

        CaregiverReport report = new CaregiverReport();
        report.setPatientCaregiver(patientCaregiver);
        report.setReportDateStart(request.reportDateStart());
        report.setReportDateEnd(request.reportDateEnd());
        report.setReportContent(request.reportContent());
        report.setObservations(request.observations());
        report.setBloodPressure(request.bloodPressure());
        report.setTemperature(request.temperature());
        report.setPulse(request.pulse());
        report.setStatus(ReportStatus.PENDING);

        return toDTO(reportRepository.save(report));
    }

    //cuidador -ver reporte de un paciente en especifico
    public List<CaregiverReportDTO> getReportsByCaregiverAndPatient(Long caregiverId, Long patientId) {
        return reportRepository
                .findByPatientCaregiver_Caregiver_IdAndPatientCaregiver_Patient_Id(caregiverId, patientId)
                .stream()
                .map(this::toDTO)
                .toList();
    }
//---------------------------------
    // GET reporte por id
    public CaregiverReportDTO getReportById(Long reportId) {
        CaregiverReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado: " + reportId));
        return toDTO(report);
    }


    // Mapper
    private CaregiverReportDTO toDTO(CaregiverReport report) {
        List<CaregiverReportDTO.DocumentDTO> docs = report.getDocuments()
                .stream()
                .map(doc -> new CaregiverReportDTO.DocumentDTO(
                        doc.getDocReportId(),
                        doc.getFileUrl(),
                        doc.getFileType(),
                        doc.getMimeType(),
                        doc.getUploadedAt()
                ))
                .toList();

        return new CaregiverReportDTO(
                report.getReportId(),
                report.getPatientCaregiver().getId(),
                report.getPatientCaregiver().getCaregiver().getFirstName() + " " + report.getPatientCaregiver().getCaregiver().getLastName(),
                report.getPatientCaregiver().getPatient().getFirstName() + " " + report.getPatientCaregiver().getPatient().getLastName(),
                report.getReportDateStart(),
                report.getReportDateEnd(),
                report.getReportContent(),
                report.getObservations(),
                report.getStatus(),
                report.getCreatedAt(),
                report.getBloodPressure(),
                report.getTemperature(),
                report.getPulse(),
                docs
        );
    }
}