package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.admin.dto.update.UpdatePatientDto;
import com.team19.CareConnect.core.domain.exception.ResourceNotFoundException;
import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.Patient;
import com.team19.CareConnect.core.domain.patient.domain.PatientStatus;
import com.team19.CareConnect.core.domain.admin.dto.create.CreatePatientRequestDto;
import com.team19.CareConnect.core.domain.patient.dto.response.PatientResponseDto;
import com.team19.CareConnect.core.domain.patient.mapper.PatientMapper;
import com.team19.CareConnect.core.domain.patient.repository.IGuardianRepository;
import com.team19.CareConnect.core.domain.patient.repository.IPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PatientAdminService implements IPatientAdminService {

    @Autowired
    private IPatientRepository patientRepository;

    @Autowired
    private IGuardianRepository guardianRepository;

    @Override
    public void createPatient(CreatePatientRequestDto patient) {
        Patient patientEntity = new Patient();

        patientEntity.setPatientDni(patient.getPatientDni());
        patientEntity.setBirthDate(patient.getBirthDate());
        patientEntity.setFirstName(patient.getFirstName());
        patientEntity.setLastName(patient.getLastName());
        patientEntity.setEmail(patient.getEmail());
        patientEntity.setPhoneNumber(patient.getPhoneNumber());
        patientEntity.setAddress(patient.getAddress());
        patientEntity.setPatientStatus(PatientStatus.ACTIVE);
        patientEntity.setCreatedAt(LocalDateTime.now());
        patientEntity.setUpdatedAt(LocalDateTime.now());
        patientEntity.setGuardian(guardianRepository.findById(patient.getGuardianId()).orElse(null));

        patientRepository.save(patientEntity);
    }

    @Override
    public PatientResponseDto getPatientById(Long patientId) {

        return patientRepository.findById(patientId)
                .map(PatientMapper::toDto)
                .orElseThrow(()->new ResourceNotFoundException("El paciente con id: " + patientId + " no existe"));
    }

    @Override
    public List<PatientResponseDto> getAllPatients() {

        return patientRepository.findAll()
                .stream().map(PatientMapper::toDto)
                .toList();
    }

    @Override
    public void updatePatient(Long patientId, UpdatePatientDto patient) {
        Patient patientEntity = patientRepository
                .findById(patientId)
                .orElseThrow(()->new ResourceNotFoundException("El paciente con id: " + patientId + " no existe"));

        if (patient.getGuardianId() != null) {
            Guardian guardian = guardianRepository
                    .findById(patient.getGuardianId())
                    .orElseThrow(()->new ResourceNotFoundException("not found"));
            Optional.of(guardian).ifPresent(patientEntity::setGuardian);
        }

        Optional.ofNullable(patient.getPatientDni()).ifPresent(patientEntity::setPatientDni);
        Optional.ofNullable(patient.getBirthDate()).ifPresent(patientEntity::setBirthDate);
        Optional.ofNullable(patient.getFirstName()).ifPresent(patientEntity::setFirstName);
        Optional.ofNullable(patient.getLastName()).ifPresent(patientEntity::setLastName);
        Optional.ofNullable(patient.getEmail()).ifPresent(patientEntity::setEmail);
        Optional.ofNullable(patient.getPhoneNumber()).ifPresent(patientEntity::setPhoneNumber);
        Optional.ofNullable(patient.getAddress()).ifPresent(patientEntity::setAddress);
        Optional.ofNullable(patient.getPatientStatus()).ifPresent(patientEntity::setPatientStatus);

        patientRepository.save(patientEntity);
    }

    @Override
    public void deletePatient(Long patientId) {
        patientRepository.deleteById(patientId);
    }
}
