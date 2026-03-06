package com.team19.CareConnect.onboarding.domain;

import com.team19.CareConnect.core.domain.admin.domain.Admin;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "caregiver_request")
@Entity
@Setter @Getter
@NoArgsConstructor
public class CaregiverRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "application_status", columnDefinition = "application_status", nullable = false)
    private ApplicationStatus applicationStatus;

    @Column(name = "submitted_at", updatable = false)
    private OffsetDateTime submittedAt;

    @Column(name = "reviewed_at")
    private OffsetDateTime reviewedAt;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "spread_sheet_id")
    private String spreadSheetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private Admin reviewedBy;

    // Relación con Document
    @OneToMany(mappedBy = "application")
    private List<Document> documents = new ArrayList<>();

    // Relación con FormInformation
    @OneToOne(mappedBy = "application",
            fetch = FetchType.EAGER,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            optional = false
    )
    private FormInformation formInformation;

    // Valores por defecto
    @PrePersist
    private void prePersist() {
        if(submittedAt == null) {
            submittedAt = OffsetDateTime.now();
        }
        if(applicationStatus == null) {
            applicationStatus = ApplicationStatus.PENDING;
        }
    }

    // Helpers
    public void addDocument(Document document) {
        this.documents.add(document);
        document.setApplication(this);
    }

    public void setFormInformation(FormInformation formInformation) {
        this.formInformation = formInformation;
        if(formInformation != null) {
            formInformation.setApplication(this);
        }
    }
}
