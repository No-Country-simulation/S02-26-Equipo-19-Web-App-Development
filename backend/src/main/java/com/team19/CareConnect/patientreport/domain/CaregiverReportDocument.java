package com.team19.CareConnect.patientreport.domain;
import com.team19.CareConnect.patientreport.domain.CaregiverReport;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.OffsetDateTime;

@Table(name = "caregiver_report_document")
@Entity
@Setter @Getter
@NoArgsConstructor

public class CaregiverReportDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_report_id")
    private Long docReportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "report_id", nullable = false)
    private CaregiverReport report;  //

    @Column(name = "file_url", columnDefinition = "TEXT")
    private String fileUrl;

    @Column(name = "mime_type", length = 100)
    private String mimeType;

    @Column(name = "uploaded_at", updatable = false)
    private OffsetDateTime uploadedAt;

    @PrePersist
    private void prePersist() {
        if (uploadedAt == null) uploadedAt = OffsetDateTime.now();
    }
}
