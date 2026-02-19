package com.team19.CareConnect.onboarding.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;

@Table(name = "form_information")
@Entity
@Setter
@Getter
@NoArgsConstructor
public class FormInformation {

    @Id
    @Column(name = "application_id")
    private Long applicationId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "availability_type", columnDefinition = "availability_type")
    private AvailabilityType availabilityType;

    private String specializations;

    // Relación con CaregiverRequest
    @OneToOne
    @MapsId
    @JoinColumn(name = "application_id")
    private CaregiverRequest application;
}
