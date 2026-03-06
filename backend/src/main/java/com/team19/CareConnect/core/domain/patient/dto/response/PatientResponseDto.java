package com.team19.CareConnect.core.domain.patient.dto.response;

import lombok.*;

import java.time.LocalDate;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientResponseDto {
    private Long patientId;
    private LocalDate birthDate;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private GuardianBasicResponseDto guardian;
}