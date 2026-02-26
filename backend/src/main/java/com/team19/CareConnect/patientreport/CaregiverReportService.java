package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.patientreport.domain.CaregiverReport;
import com.team19.CareConnect.patientreport.domain.ReportStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaregiverReportService {

    private final CaregiverReportRepository reportRepository;

    // GET todos los reportes - Admin
    public List<CaregiverReportDTO> getAllReports() {
        return reportRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // GET reportes por patientCaregiverId - Caregiver / Family
    public List<CaregiverReportDTO> getReportsByPatientCaregiver(Long patientCaregiverId) {
        return reportRepository.findByPatientCaregiver_Id(patientCaregiverId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // GET reporte por id
    public CaregiverReportDTO getReportById(Long reportId) {
        CaregiverReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado: " + reportId));
        return toDTO(report);
    }

    // PATCH cambiar status - Admin
    public CaregiverReportDTO updateStatus(Long reportId, ReportStatus newStatus) {
        CaregiverReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado: " + reportId));
        report.setStatus(newStatus);
        return toDTO(reportRepository.save(report));
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
                report.getReportDateStart(),
                report.getReportDateEnd(),
                report.getReportContent(),
                report.getObservations(),
                report.getStatus(),
                report.getCreatedAt(),
                docs
        );
    }
}