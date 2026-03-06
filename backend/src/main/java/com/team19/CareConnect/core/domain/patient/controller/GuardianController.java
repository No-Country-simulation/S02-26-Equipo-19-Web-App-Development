package com.team19.CareConnect.core.domain.patient.controller;

import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;
import com.team19.CareConnect.core.domain.patient.service.GuardianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/guardian")
public class GuardianController {

    @Autowired
    private GuardianService guardianService;

    @GetMapping("/test")
    public String test(){
        return "test";
    }

    @GetMapping("/all/guardians")
    public List<GuardianResponseDto> getAllGuardians(){
        return guardianService.findAllGuardians();
    }

    @GetMapping("/guardian")
    public GuardianResponseDto getGuardianWithPatients(Long guardianId){

        return guardianService.findGuardianById(guardianId);
    }
}
