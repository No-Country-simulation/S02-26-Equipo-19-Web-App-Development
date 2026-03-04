package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.GuardianStatus;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;
import com.team19.CareConnect.core.domain.patient.mapper.Mapper;
import com.team19.CareConnect.core.domain.patient.repository.IGuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GuardianService implements IGuardianService{

    @Autowired
    private IGuardianRepository  guardianRepository;

    @Override
    public GuardianResponseDto findGuardianById(Long guardianId) {
        return guardianRepository.findById(guardianId).map(Mapper::toDto)
                .orElse(null);
    }

    @Override
    public List<GuardianResponseDto> findAllGuardians() {
        return guardianRepository.findAll().stream().map(Mapper::toDto).toList();
    }

    @Override
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
                               LocalDateTime updatedAt) {
        Guardian guardian = guardianRepository.findById(guardianId)
                .orElseThrow(()-> new RuntimeException("Guardian no encontrado"));

        Optional.ofNullable(guardianDni).ifPresent(guardian::setGuardianDni);
        Optional.ofNullable(firstName).ifPresent(guardian::setFirstName);
        Optional.ofNullable(lastName).ifPresent(guardian::setLastName);
        Optional.ofNullable(email).ifPresent(guardian::setEmail);
        Optional.ofNullable(birthDate).ifPresent(guardian::setBirthDate);
        Optional.ofNullable(password).ifPresent(guardian::setPassword);
        Optional.ofNullable(phoneNumber).ifPresent(guardian::setPhoneNumber);
        Optional.ofNullable(address).ifPresent(guardian::setAddress);
        Optional.ofNullable(status).ifPresent(guardian::setGuardianStatus);
        guardian.setUpdatedAt(LocalDateTime.now());

        guardianRepository.save(guardian);
    }

    @Override
    public void deleteGuardian(Long guardianId) {
        guardianRepository.deleteById(guardianId);
    }
}
