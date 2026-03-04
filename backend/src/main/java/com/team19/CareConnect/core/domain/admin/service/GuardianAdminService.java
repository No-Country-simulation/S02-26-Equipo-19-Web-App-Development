package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.Role;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateGuardianDto;
import com.team19.CareConnect.core.domain.exception.ResourceNotFoundException;
import com.team19.CareConnect.core.domain.patient.domain.Guardian;
import com.team19.CareConnect.core.domain.patient.domain.GuardianStatus;
import com.team19.CareConnect.core.domain.admin.dto.create.CreateGuardianRequestDto;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;
import com.team19.CareConnect.core.domain.patient.mapper.PatientMapper;
import com.team19.CareConnect.core.domain.patient.repository.IGuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GuardianAdminService implements IGuardianAdminService {

    @Autowired
    private IGuardianRepository guardianRepository;

    @Override
    public void createGuardian(CreateGuardianRequestDto guardian) {

        Guardian guardianEntity = new Guardian();

        guardianEntity.setGuardianDni(guardian.getGuardianDni());
        guardianEntity.setFirstName(guardian.getFirstName());
        guardianEntity.setLastName(guardian.getLastName());
        guardianEntity.setEmail(guardian.getEmail());
        guardianEntity.setBirthDate(guardian.getBirthDate());
        guardianEntity.setPassword(guardian.getPassword());
        guardianEntity.setPhoneNumber(guardian.getPhoneNumber());
        guardianEntity.setAddress(guardian.getAddress());
        guardianEntity.setGuardianStatus(GuardianStatus.ACTIVE);
        guardianEntity.setRole(Role.GUARDIAN);
        guardianEntity.setCreatedAt(LocalDateTime.now());
        guardianEntity.setUpdatedAt(LocalDateTime.now());

        guardianRepository.save(guardianEntity);
    }

    @Override
    public GuardianResponseDto getGuardianById(Long guardianId) {
        return guardianRepository.findById(guardianId)
                .map(PatientMapper::toDto)
                .orElseThrow(()-> new ResourceNotFoundException("Guardian with id: " + guardianId + " does not exist"));
    }

    @Override
    public List<GuardianResponseDto> getAllGuardians() {
        return guardianRepository.findAll().stream().map(PatientMapper::toDto).toList();
    }

    @Override
    public void updateGuardian(Long guardianId,
                               UpdateGuardianDto updateGuardianDto) {

        Guardian guardianEntity = guardianRepository.findById(guardianId)
                .orElseThrow(() -> new ResourceNotFoundException("Guardian with id: " + guardianId + " does not exist"));

        Optional.ofNullable(updateGuardianDto.getGuardianDni()).ifPresent(guardianEntity::setGuardianDni);
        Optional.ofNullable(updateGuardianDto.getFirstName()).ifPresent(guardianEntity::setFirstName);
        Optional.ofNullable(updateGuardianDto.getLastName()).ifPresent(guardianEntity::setLastName);
        Optional.ofNullable(updateGuardianDto.getEmail()).ifPresent(guardianEntity::setEmail);
        Optional.ofNullable(updateGuardianDto.getBirthDate()).ifPresent(guardianEntity::setBirthDate);
        Optional.ofNullable(updateGuardianDto.getPassword()).ifPresent(guardianEntity::setPassword);
        Optional.ofNullable(updateGuardianDto.getPhoneNumber()).ifPresent(guardianEntity::setPhoneNumber);
        Optional.ofNullable(updateGuardianDto.getAddress()).ifPresent(guardianEntity::setAddress);
        Optional.ofNullable(guardianEntity.getGuardianStatus()).ifPresent(guardianEntity::setGuardianStatus);
        guardianEntity.setUpdatedAt(LocalDateTime.now());

        guardianRepository.save(guardianEntity);
    }

    @Override
    public void deleteGuardian(Long guardianId) {
        guardianRepository.deleteById(guardianId);
    }
}
