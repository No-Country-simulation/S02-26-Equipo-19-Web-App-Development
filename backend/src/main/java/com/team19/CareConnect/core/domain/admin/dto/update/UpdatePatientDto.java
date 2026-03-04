package com.team19.CareConnect.core.domain.admin.dto.update;

import com.team19.CareConnect.core.domain.patient.domain.PatientStatus;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatePatientDto {
    private String patientDni;
    private LocalDate birthDate;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private PatientStatus patientStatus;
    private Long guardianId;
}
