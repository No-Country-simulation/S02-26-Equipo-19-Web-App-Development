package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import com.team19.CareConnect.core.domain.caregiver.domain.CaregiverStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ICaregiverService {

    public void createCaregiver(Caregiver caregiver);
    public Caregiver findCaregiverById(Long caregiverId);
    public List<Caregiver> findAllCaregivers();
    public List<Caregiver> findAllCaregiversByPatientId(Long patientId);
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
                                LocalDateTime updatedAt);

    public void deleteCaregiver(Long caregiverId);
}