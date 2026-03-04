package com.team19.CareConnect.core.domain.patient.mapper;

import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.Patient;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianBasicResponseDto;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;
import com.team19.CareConnect.core.domain.patient.dto.response.PatientBasicResponseDto;
import com.team19.CareConnect.core.domain.patient.dto.response.PatientResponseDto;

public class Mapper {

    //Mapeo de Guardian a GuardianResponseDto

    public static GuardianResponseDto toDto(Guardian guardian) {
        if (guardian == null) return null;

        return GuardianResponseDto.builder()
                .guardianId(guardian.getId())
                .firstName(guardian.getFirstName())
                .lastName(guardian.getLastName())
                .email(guardian.getEmail())
                .guardianDni(guardian.getGuardianDni())
                .birthDate(guardian.getBirthDate())
                .phoneNumber(guardian.getPhoneNumber())
                .address(guardian.getAddress())
                .patientList(guardian.getPatients().stream().map(Mapper::toBasicDto).toList())
                .build();
    }

    public static GuardianBasicResponseDto toBasicDto(Guardian guardian) {
        if (guardian == null) return null;

        return GuardianBasicResponseDto.builder()
                .guardianId(guardian.getId())
                .firstName(guardian.getFirstName())
                .lastName(guardian.getLastName())
                .email(guardian.getEmail())
                .phoneNumber(guardian.getPhoneNumber())
                .build();
    }

    //Mapeo de Patient a PatientResponseDto / PatientBasicResponseDto

    public static PatientResponseDto toDto(Patient patient) {
        if (patient == null) return null;

        return PatientResponseDto.builder()
                .patientId(patient.getId())
                .birthDate(patient.getBirthDate())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .email(patient.getEmail())
                .phoneNumber(patient.getPhoneNumber())
                .address(patient.getAddress())
                .guardian(Mapper.toBasicDto(patient.getGuardian()))
                .build();
    }

    public static PatientBasicResponseDto toBasicDto(Patient patient) {
        if (patient == null) return null;

        return PatientBasicResponseDto.builder()
                .patientId(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .patientStatus(patient.getPatientStatus())
                .build();
    }

    //Mapeo de Caregiver a CaregiverResponseDto

    //Mapeo de Admin a AdminResponseDto


}
