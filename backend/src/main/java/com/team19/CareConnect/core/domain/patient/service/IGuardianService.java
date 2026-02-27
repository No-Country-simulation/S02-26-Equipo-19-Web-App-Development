package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.GuardianStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IGuardianService {
    public void createGuardian(Guardian guardian);
    public Guardian findGuardianById(Long guardianId);
    public Guardian findGuardianByPatientId(Long patientId);
    public List<Guardian> findAllGuardians();
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