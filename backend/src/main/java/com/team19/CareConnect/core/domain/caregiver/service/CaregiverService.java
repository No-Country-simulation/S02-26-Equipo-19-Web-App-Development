package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import com.team19.CareConnect.core.domain.caregiver.domain.CaregiverStatus;
import com.team19.CareConnect.core.domain.caregiver.repository.ICaregiverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CaregiverService implements ICaregiverService {

    @Autowired
    private ICaregiverRepository caregiverRepository;

    @Override
    public void createCaregiver(Caregiver caregiver) {
        caregiverRepository.save(caregiver);
    }

    @Override
    public Caregiver findCaregiverById(Long caregiverId) {
        return caregiverRepository.findById(caregiverId).orElse(null);
    }

    @Override
    public List<Caregiver> findAllCaregivers() {
        return caregiverRepository.findAll();
    }

    @Override
    public List<Caregiver> findAllCaregiversByPatientId(Long patientId) {

        return caregiverRepository.findAllByPatientId(patientId);
    }

    @Override
    public void updateCaregiver(Long caregiverId,
                                String caregiverDni,
                                String firstName,
                                String lastName,
                                String email,
                                String phoneNumber,
                                String password,
                                LocalDate birthDate,
                                CaregiverStatus caregiverStatus,
                                String address,
                                LocalDateTime updatedAt) {

        Caregiver caregiver = caregiverRepository.findById(caregiverId).orElse(null);

        assert caregiver != null;
        Optional.ofNullable(caregiverDni).ifPresent(caregiver::setCaregiverDni);
        Optional.ofNullable(firstName).ifPresent(caregiver::setFirstName);
        Optional.ofNullable(lastName).ifPresent(caregiver::setLastName);
        Optional.ofNullable(email).ifPresent(caregiver::setEmail);
        Optional.ofNullable(phoneNumber).ifPresent(caregiver::setPhoneNumber);
        Optional.ofNullable(password).ifPresent(caregiver::setPassword);
        Optional.ofNullable(birthDate).ifPresent(caregiver::setBirthDate);
        Optional.ofNullable(caregiverStatus).ifPresent(caregiver::setCaregiverStatus);
        Optional.ofNullable(address).ifPresent(caregiver::setAddress);
        caregiver.setUpdatedAt(LocalDateTime.now());

        caregiverRepository.save(caregiver);

    }

    @Override
    public void deleteCaregiver(Long caregiverId) {
        caregiverRepository.deleteById(caregiverId);
    }
}
