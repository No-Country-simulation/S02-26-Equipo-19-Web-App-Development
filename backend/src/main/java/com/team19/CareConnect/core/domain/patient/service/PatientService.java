package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.Patient;
import com.team19.CareConnect.core.domain.patient.repository.IPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService implements IPatientService {

    @Autowired
    private IPatientRepository patientRepository;

    @Override
    public void createPatient(Patient patient) {

    }

    @Override
    public Patient findPatientById(Long patientId) {
        return null;
    }
}
