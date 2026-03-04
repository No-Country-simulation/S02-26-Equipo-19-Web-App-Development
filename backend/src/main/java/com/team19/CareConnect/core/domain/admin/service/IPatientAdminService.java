package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.admin.dto.update.UpdatePatientDto;
import com.team19.CareConnect.core.domain.admin.dto.create.CreatePatientRequestDto;import com.team19.CareConnect.core.domain.patient.dto.response.PatientResponseDto;

import java.util.List;

public interface IPatientAdminService {
    public void createPatient(CreatePatientRequestDto patient);
    public PatientResponseDto getPatientById(Long patientId);
    public List<PatientResponseDto> getAllPatients();
    public void updatePatient(Long patientId,
                              UpdatePatientDto patient);
    public void deletePatient(Long patientId);
}