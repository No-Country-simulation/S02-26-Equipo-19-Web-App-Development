package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.repository.IPatientSecondaryContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientSecondaryContactService implements IPatientSecondaryContactService {

    @Autowired
    private IPatientSecondaryContactRepository  patientSecondaryContactRepository;
}
