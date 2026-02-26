package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.patientreport.domain.ReportStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class CaregiverReportController {

    private final CaregiverReportService reportService;

    // GET todos - Admin
    @GetMapping
    public ResponseEntity<List<CaregiverReportDTO>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    // GET por patientCaregiverId - Caregiver / Family
    @GetMapping("/patient-caregiver/{patientCaregiverId}")
    public ResponseEntity<List<CaregiverReportDTO>> getByPatientCaregiver(
            @PathVariable Long patientCaregiverId) {
        return ResponseEntity.ok(reportService.getReportsByPatientCaregiver(patientCaregiverId));
    }

    // GET por reportId
    @GetMapping("/{reportId}")
    public ResponseEntity<CaregiverReportDTO> getById(@PathVariable Long reportId) {
        return ResponseEntity.ok(reportService.getReportById(reportId));
    }

    // PATCH status - Admin
    @PatchMapping("/{reportId}/status")
    public ResponseEntity<CaregiverReportDTO> updateStatus(
            @PathVariable Long reportId,
            @RequestParam ReportStatus status) {
        return ResponseEntity.ok(reportService.updateStatus(reportId, status));
    }
}