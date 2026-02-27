package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.Patient;

public interface IPatientService {
    public void createPatient(Patient patient);
    public Patient findPatientById(Long patientId);
}
