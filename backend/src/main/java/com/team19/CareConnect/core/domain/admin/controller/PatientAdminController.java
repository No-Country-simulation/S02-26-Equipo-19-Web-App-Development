package com.team19.CareConnect.core.domain.admin.controller;

import com.team19.CareConnect.core.domain.admin.dto.update.UpdatePatientDto;
import com.team19.CareConnect.core.domain.admin.service.PatientAdminService;
import com.team19.CareConnect.core.domain.admin.dto.create.CreatePatientRequestDto;
import com.team19.CareConnect.core.domain.patient.dto.response.PatientResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class PatientAdminController {

    @Autowired
    private PatientAdminService patientAdminService;

    @PostMapping("/patient")
    public String createPatient(@RequestBody CreatePatientRequestDto patient) {
        patientAdminService.createPatient(patient);
        return "Patient created";
    }

    @GetMapping("/patient/{patientId}")
    public PatientResponseDto getPatient(@PathVariable Long patientId){
        return  patientAdminService.getPatientById(patientId);
    }

    @GetMapping("/patient")
    public List<PatientResponseDto> getPatients(){
        return patientAdminService.getAllPatients();
    }

    @PutMapping("/patient/{patientId}")
    public String updatePatient(@PathVariable Long patientId,
                                @RequestBody UpdatePatientDto patient) {
        patientAdminService.updatePatient(patientId, patient);
        return "Patient updated";
    }

    @DeleteMapping("/patient/{patientId}")
    public String deletePatient(@PathVariable Long patientId) {
        patientAdminService.deletePatient(patientId);
        return "Patient deleted";
    }
}
