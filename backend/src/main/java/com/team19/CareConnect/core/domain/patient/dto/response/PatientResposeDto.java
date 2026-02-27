package com.team19.CareConnect.core.domain.patient.dto.response;

import com.team19.CareConnect.core.domain.patient.domain.PatientStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;

public class PatientResposeDto {
    private LocalDate birthDate;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    @Enumerated(EnumType.STRING)
    private PatientStatus patientStatus;


}
