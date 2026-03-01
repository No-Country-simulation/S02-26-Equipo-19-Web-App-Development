package com.team19.CareConnect.patientreport.domain;

import com.team19.CareConnect.core.domain.PatientCaregiver;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "caregiver_report")
@Entity
@Setter @Getter
@NoArgsConstructor
public class CaregiverReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_caregiver_id", nullable = false)
    private PatientCaregiver patientCaregiver;

    @Column(name = "report_date_start")
    private LocalDate reportDateStart;

    @Column(name = "report_date_end")
    private LocalDate reportDateEnd;

    @Column(name = "report_content", columnDefinition = "TEXT")
    private String reportContent;

    @Column(name = "observations", columnDefinition = "TEXT")
    private String observations;

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "blood_pressure")
    private String bloodPressure;

    @Column(name = "temperature")
    private String temperature;

    @Column(name = "pulse")
    private String pulse;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status", columnDefinition = "report_status")
    private ReportStatus status;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CaregiverReportDocument> documents = new ArrayList<>();

    @PrePersist
    private void prePersist() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
        if (status == null) status = ReportStatus.PENDING;
    }

    public void addDocument(CaregiverReportDocument doc) {
        this.documents.add(doc);
        doc.setReport(this);
    }
}
