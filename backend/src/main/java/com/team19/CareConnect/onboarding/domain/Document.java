package com.team19.CareConnect.onboarding.domain;

import com.team19.CareConnect.onboarding.enums.DocumentType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;

@Table(name = "document")
@Entity
@Setter
@Getter
@NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_id")
    private Long documentId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "document_type", columnDefinition = "document_type", nullable = false)
    private DocumentType documentType;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "mime_type", length = 100)
    private String mimeType;

    @Column(name = "uploaded_at", updatable = false)
    private OffsetDateTime uploadedAt;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "application_id", nullable = false)
    private CaregiverRequest application;

    @PrePersist
    private void prePersist() {
        if(uploadedAt == null) {
            uploadedAt = OffsetDateTime.now();
        }
        if(isVerified == null) {
            isVerified = false;
        }
    }
}
