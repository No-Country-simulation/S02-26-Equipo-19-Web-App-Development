package com.team19.CareConnect.core.domain.patient.dto.request;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePatientRequestDto {
    private String patientDni;
    private LocalDate birthDate;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private Long guardianId;
}
