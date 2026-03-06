package com.team19.CareConnect.core.domain.admin.controller;

import com.team19.CareConnect.core.domain.admin.dto.update.UpdateGuardianDto;
import com.team19.CareConnect.core.domain.admin.service.GuardianAdminService;
import com.team19.CareConnect.core.domain.admin.dto.create.CreateGuardianRequestDto;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class GuardianAdminController {

    @Autowired
    private GuardianAdminService guardianAdminService;

    @PostMapping("/guardian")
    public String createGuardian(@RequestBody CreateGuardianRequestDto guardian) {
        guardianAdminService.createGuardian(guardian);
        return "Guardian created";
    }

    @GetMapping("/guardian/{guardianId}")
    public GuardianResponseDto getGuardianById(@PathVariable Long guardianId) {
        return guardianAdminService.getGuardianById(guardianId);
    }

    @GetMapping("/guardian")
    public List<GuardianResponseDto> getAllGuardians() {
        return guardianAdminService.getAllGuardians();
    }

    @PutMapping("/guardian/{guardianId}")
    public String updateGuardian(@PathVariable Long guardianId,
                                 @RequestBody UpdateGuardianDto updateGuardianDto) {

        guardianAdminService.updateGuardian(guardianId, updateGuardianDto);
        return "Guardian updated";
    }

    @DeleteMapping("/guardian/{guardianId}")
    public String deleteGuardian(@PathVariable Long guardianId) {
        guardianAdminService.deleteGuardian(guardianId);
        return "Guardian deleted";
    }

}