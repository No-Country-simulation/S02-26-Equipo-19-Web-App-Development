package com.team19.CareConnect.core.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patient-caregiver")
@RequiredArgsConstructor
public class PatientCaregiverController {

    private final PatientCaregiverService patientCaregiverService;

    //para cargar la ddl en realizar un reporte nuevo--cuidador-paciente
    @GetMapping("/caregiver/{caregiverId}/patients")
    public ResponseEntity<List<PatientCaregiverDTO>> getPatientsByCaregiver(
            @PathVariable Long caregiverId) {
        return ResponseEntity.ok(patientCaregiverService.getPatientsByCaregiver(caregiverId));
    }
}
