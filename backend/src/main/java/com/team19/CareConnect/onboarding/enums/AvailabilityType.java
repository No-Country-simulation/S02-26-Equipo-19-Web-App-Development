package com.team19.CareConnect.onboarding.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Getter
@RequiredArgsConstructor
public enum AvailabilityType {
    FULL_TIME("Tiempo completo"),
    PART_TIME("Medio completo"),
    WEEKENDS("Fines de semana");

    private final String label;

    public static AvailabilityType fromLabel(String label) {
        if (label == null || label.isBlank()) return null;

        return Arrays.stream(values())
                .filter(e -> e.label.equalsIgnoreCase(label.trim()))
                .findFirst()
                .orElse(null);
    }
}
