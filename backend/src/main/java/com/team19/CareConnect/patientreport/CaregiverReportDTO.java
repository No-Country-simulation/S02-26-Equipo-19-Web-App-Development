package com.team19.CareConnect.patientreport;

import com.team19.CareConnect.patientreport.domain.FileType;
import com.team19.CareConnect.patientreport.domain.ReportStatus;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

public record CaregiverReportDTO(
        Long reportId,
        Long patientCaregiverId,
        LocalDate reportDateStart,
        LocalDate reportDateEnd,
        String reportContent,
        String observations,
        ReportStatus status,
        OffsetDateTime createdAt,
        List<DocumentDTO> documents
) {
    public record DocumentDTO(
            Long docReportId,
            String fileUrl,
            FileType fileType,
            String mimeType,
            OffsetDateTime uploadedAt
    ) {}
}