package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.admin.dto.UpdatePatientDto;import com.team19.CareConnect.core.domain.patient.domain.Patient;
import com.team19.CareConnect.core.domain.patient.domain.PatientStatus;
import com.team19.CareConnect.core.domain.patient.dto.request.CreatePatientRequestDto;import com.team19.CareConnect.core.domain.patient.dto.response.PatientResponseDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IPatientAdminService {
    public void createPatient(CreatePatientRequestDto patient);
    public PatientResponseDto getPatientById(Long patientId);
    public List<PatientResponseDto> getAllPatients();
    public void updatePatient(Long patientId,
                              UpdatePatientDto patient);
    public void deletePatient(Long patientId);
}