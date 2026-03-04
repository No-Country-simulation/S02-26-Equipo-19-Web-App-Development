package com.team19.CareConnect.core.domain.patient_caregiver;

public record PatientCaregiverDTO(
        Long patientCaregiverId,
        Long patientId,
        String patientName
) {}