package com.team19.CareConnect.core.domain.caregiver.controller;

import com.team19.CareConnect.core.domain.caregiver.service.CaregiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CaregiverController {

    @Autowired
    private CaregiverService caregiverService;

    @GetMapping("/test")
    public String test1()
    {
        return "test";
    }
}
