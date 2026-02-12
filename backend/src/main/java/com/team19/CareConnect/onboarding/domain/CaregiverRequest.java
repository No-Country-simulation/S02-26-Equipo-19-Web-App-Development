package com.team19.CareConnect.onboarding.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;

@Entity
public class CaregiverRequest {
    @Id
    @Column(name = "application_id")
    private Long applicationId;

    @Column(name = "application_status")
    @Size(max = 30)
    private String applicationStatus;

    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "reviewed_at")
    private OffsetDateTime reviewedAt;

    @Column(name = "reviewed_by")
    private Long reviewedBy;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "spread_sheet_id")
    private String spreadSheetId;
}
