package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.GuardianStatus;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IGuardianService {
    public GuardianResponseDto findGuardianById(Long guardianId);
    public List<GuardianResponseDto> findAllGuardians();
    public void updateGuardian(Long guardianId,
                               String guardianDni,
                               String firstName,
                               String lastName,
                               String email,
                               LocalDate birthDate,
                               String password,
                               String phoneNumber,
                               String address,
                               GuardianStatus status,
                               LocalDateTime updatedAt);
    public void deleteGuardian(Long guardianId);
}