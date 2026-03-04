package com.team19.CareConnect.core.domain.admin.controller;

import com.team19.CareConnect.core.domain.admin.dto.create.CreateCaregiverDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateCaregiverDto;
import com.team19.CareConnect.core.domain.admin.service.CaregiverAdminService;
import com.team19.CareConnect.core.domain.caregiver.dto.response.CaregiverResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class CaregiverAdminController {

    @Autowired
    private CaregiverAdminService caregiverAdminService;

    @PostMapping("/caregiver")
    public String createCaregiver(@RequestBody CreateCaregiverDto caregiver) {
        caregiverAdminService.createCaregiver(caregiver);
        return "Caregiver Created";
    }

    @GetMapping("/caregiver/{caregiverId}")
    public CaregiverResponseDto getCaregiverById(@PathVariable Long caregiverId) {
        return caregiverAdminService.getCaregiverById(caregiverId);
    }

    @GetMapping("/caregiver")
    public List<CaregiverResponseDto> getCaregivers() {
        return caregiverAdminService.getCaregivers();
    }

    @PutMapping("/caregiver/{caregiverId}")
    public String updateCaregiver(@PathVariable Long caregiverId,
                                  @RequestBody UpdateCaregiverDto caregiver) {
        caregiverAdminService.updateCaregiver(caregiverId, caregiver);
        return "Caregiver Updated";
    }

    @DeleteMapping("/caregiver")
    public String deleteCaregiver(@PathVariable Long caregiverId) {
        caregiverAdminService.deleteCaregiver(caregiverId);
        return "Caregiver Deleted";
    }
}
