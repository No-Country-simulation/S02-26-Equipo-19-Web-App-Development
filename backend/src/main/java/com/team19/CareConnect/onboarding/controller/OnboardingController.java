package com.team19.CareConnect.onboarding.controller;

import com.team19.CareConnect.onboarding.domain.Document;
import com.team19.CareConnect.onboarding.dto.GoogleFormsPayloadDTO;
import com.team19.CareConnect.onboarding.repository.DocumentRepository;
import com.team19.CareConnect.onboarding.service.GoogleDriveService;
import com.team19.CareConnect.onboarding.service.OnboardingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/onboarding")
@RequiredArgsConstructor
public class OnboardingController {

    private final OnboardingService onboardingService;
    private final DocumentRepository documentRepository;
    private final GoogleDriveService googleDriveService;
    private static final Logger logger = LoggerFactory.getLogger(OnboardingController.class);

    @GetMapping("/download/{documentId}")
    public ResponseEntity<byte[]> downloadDocument(@PathVariable Long documentId) {
        try {

            Document doc = documentRepository.findById(documentId)
                    .orElseThrow(() -> new RuntimeException("Documento no encontrado"));

            byte[] content = googleDriveService.obtenerContenidoArchivo(doc.getFilePath());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + doc.getFileName() + "\"")
                    .contentType(MediaType.parseMediaType(doc.getMimeType()))
                    .body(content);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/form-submit")
    public ResponseEntity<String> handleFormSubmit(@Valid @RequestBody GoogleFormsPayloadDTO payload) {
        try {

            logger.info("DTO: {}", payload);
            onboardingService.processFormSubmission(payload);

            return ResponseEntity.ok("Respuesta procesada correctamente");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al procesar: " + e.getMessage());
        }
    }
}