package com.team19.CareConnect.core.domain;

public record PatientCaregiverDTO(
        Long patientCaregiverId,
        Long patientId,
        String patientName
) {}