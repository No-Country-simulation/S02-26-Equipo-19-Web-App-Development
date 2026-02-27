package com.team19.CareConnect.onboarding.controller;

import com.team19.CareConnect.onboarding.dto.GoogleFormsPayloadDTO;
import com.team19.CareConnect.onboarding.service.FormInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/form_information")
@RequiredArgsConstructor
public class FormInformationController {
    private final FormInformationService requestService;

    @PostMapping
    public ResponseEntity<?> handleGoogleFormSubmission(
            @RequestBody GoogleFormsPayloadDTO payload) {

        requestService.processGoogleForm(payload);
        return ResponseEntity.accepted().body("Recibido");
    }
}
