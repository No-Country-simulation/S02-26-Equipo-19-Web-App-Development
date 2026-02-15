package com.team19.CareConnect.onboarding.domain;

import com.team19.CareConnect.core.domain.Admin;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;

import java.time.OffsetDateTime;
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
    @Column(name = "application_status", columnDefinition = "application_status")
    private ApplicationStatus applicationStatus = ApplicationStatus.PENDING;

    @CreatedDate
    @Column(name = "submitted_at")
    private OffsetDateTime submittedAt;

    @Column(name = "reviewed_at")
    private OffsetDateTime reviewedAt;


    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "spread_sheet_id", columnDefinition = "TEXT")
    private String spreadSheetId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private Admin reviewedBy;
}
