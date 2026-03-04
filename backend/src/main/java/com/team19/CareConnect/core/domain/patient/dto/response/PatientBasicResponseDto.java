package com.team19.CareConnect.core.domain.patient.dto.response;

import com.team19.CareConnect.core.domain.patient.domain.PatientStatus;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientBasicResponseDto {
    private Long patientId;
    private String firstName;
    private String lastName;
    private PatientStatus patientStatus;
}