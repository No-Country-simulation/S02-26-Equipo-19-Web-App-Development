package com.team19.CareConnect.core.domain.patient.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuardianResponseDto {
    private Long guardianId;
    private String firstName;
    private String lastName;
    private String email;
    private String guardianDni;
    private LocalDate birthDate;
    private String phoneNumber;
    private String address;
    private List<PatientBasicResponseDto> patientList;
}
