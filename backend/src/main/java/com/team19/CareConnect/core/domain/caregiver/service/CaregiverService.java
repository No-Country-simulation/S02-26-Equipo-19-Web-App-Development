package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import com.team19.CareConnect.core.domain.caregiver.domain.CaregiverStatus;
import com.team19.CareConnect.core.domain.caregiver.repository.ICaregiverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CaregiverService implements ICaregiverService {

    @Autowired
    private ICaregiverRepository caregiverRepository;

    @Override
    public void createCaregiver(Caregiver caregiver) {

    }

    @Override
    public Caregiver findCaregiverById(Long caregiverId) {
        return null;
    }

    @Override
    public List<Caregiver> findAllCaregivers() {
        return List.of();
    }

    @Override
    public List<Caregiver> findAllCaregiversByPatientId(Long patientId) {
        return List.of();
    }

    @Override
    public void updateCaregiver(Long caregiverId, String caregiverDni, String firstName, String lastName, String email, String phoneNumber, String password, LocalDate birthDate, CaregiverStatus caregiverStatus, String address, LocalDateTime updatedAt) {

    }

    @Override
    public void deleteCaregiver(Long caregiverId) {

    }
}
