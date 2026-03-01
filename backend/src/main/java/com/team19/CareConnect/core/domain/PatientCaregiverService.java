package com.team19.CareConnect.core.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientCaregiverService {

    private final PatientCaregiverRepository patientCaregiverRepository;

    public List<PatientCaregiverDTO> getPatientsByCaregiver(Long caregiverId) {
        return patientCaregiverRepository.findByCaregiver_Id(caregiverId)
                .stream()
                .map(pc -> new PatientCaregiverDTO(
                        pc.getId(),
                        pc.getPatient().getId(),
                        pc.getPatient().getFirstName() + " " + pc.getPatient().getLastName()
                ))
                .toList();
    }
}