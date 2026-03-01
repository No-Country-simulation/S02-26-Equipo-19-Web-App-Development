package com.team19.CareConnect.patientreport;

import java.time.LocalDate;

public record CaregiverReportRequestDTO(
        Long patientCaregiverId,
        LocalDate reportDateStart,
        LocalDate reportDateEnd,
        String reportContent,
        String observations,
        String bloodPressure,
        String temperature,
        String pulse
) {}