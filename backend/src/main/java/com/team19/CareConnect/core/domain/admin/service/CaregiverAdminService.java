package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.Role;import com.team19.CareConnect.core.domain.admin.dto.create.CreateCaregiverDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateCaregiverDto;
import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;import com.team19.CareConnect.core.domain.caregiver.domain.CaregiverStatus;import com.team19.CareConnect.core.domain.caregiver.dto.response.CaregiverResponseDto;
import com.team19.CareConnect.core.domain.caregiver.mapper.CaregiverMapper;import com.team19.CareConnect.core.domain.caregiver.repository.ICaregiverRepository;
import com.team19.CareConnect.core.domain.exception.ResourceNotFoundException;import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;import java.util.List;
import java.util.Optional;

@Service
public class CaregiverAdminService implements ICaregiverAdminService {

    @Autowired
    private ICaregiverRepository caregiverRepository;

    @Override
    public void createCaregiver(CreateCaregiverDto caregiver) {
        Caregiver caregiverEntity = new Caregiver();

        caregiverEntity.setCaregiverDni(caregiver.getCaregiverDni());
        caregiverEntity.setFirstName(caregiver.getFirstName());
        caregiverEntity.setLastName(caregiver.getLastName());
        caregiverEntity.setEmail(caregiver.getEmail());
        caregiverEntity.setPassword(caregiver.getPassword());
        caregiverEntity.setPhoneNumber(caregiver.getPhoneNumber());
        caregiverEntity.setAddress(caregiver.getAddress());
        caregiverEntity.setBirthDate(caregiver.getBirthDate());
        caregiverEntity.setRole(Role.CAREGIVER);
        caregiverEntity.setCaregiverStatus(CaregiverStatus.ACTIVE);
        caregiverEntity.setCreatedAt(LocalDateTime.now());
        caregiverEntity.setUpdatedAt(LocalDateTime.now());

        caregiverRepository.save(caregiverEntity);
    }

    @Override
    public CaregiverResponseDto getCaregiverById(Long caregiverId) {
        return caregiverRepository.findById(caregiverId)
                .map(CaregiverMapper::toDto)
                .orElseThrow(()->new ResourceNotFoundException("Cuidador no encontrado con el id: " + caregiverId));
    }

    @Override
    public List<CaregiverResponseDto> getCaregivers() {
        return caregiverRepository.findAll()
                .stream().map(CaregiverMapper::toDto)
                .toList();
    }

    @Override
    public void updateCaregiver(Long caregiverId, UpdateCaregiverDto caregiver) {
        Caregiver caregiverEntity = caregiverRepository.findById(caregiverId)
                .orElseThrow(()->new ResourceNotFoundException("Cuidador no encontrado con el id: " + caregiverId));

        Optional.ofNullable(caregiver.getCaregiverDni()).ifPresent(caregiverEntity::setCaregiverDni);
        Optional.ofNullable(caregiver.getFirstName()).ifPresent(caregiverEntity::setFirstName);
        Optional.ofNullable(caregiver.getLastName()).ifPresent(caregiverEntity::setLastName);
        Optional.ofNullable(caregiver.getEmail()).ifPresent(caregiverEntity::setEmail);
        Optional.ofNullable(caregiver.getPhoneNumber()).ifPresent(caregiverEntity::setPhoneNumber);
        Optional.ofNullable(caregiver.getPassword()).ifPresent(caregiverEntity::setPassword);
        Optional.ofNullable(caregiver.getBirthDate()).ifPresent(caregiverEntity::setBirthDate);
        Optional.ofNullable(caregiver.getAddress()).ifPresent(caregiverEntity::setAddress);
        Optional.ofNullable(caregiver.getCaregiverStatus()).ifPresent(caregiverEntity::setCaregiverStatus);
        caregiverEntity.setUpdatedAt(LocalDateTime.now());

        caregiverRepository.save(caregiverEntity);
    }

    @Override
    public void deleteCaregiver(Long caregiverId) {
        caregiverRepository.deleteById(caregiverId);
    }
}
