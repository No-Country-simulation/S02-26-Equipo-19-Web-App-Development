package com.team19.CareConnect.onboarding.service;

import com.team19.CareConnect.onboarding.domain.CaregiverRequest;
import com.team19.CareConnect.onboarding.domain.Document;
import com.team19.CareConnect.onboarding.domain.FormInformation;
import com.team19.CareConnect.onboarding.dto.GoogleFormsPayloadDTO;
import com.team19.CareConnect.onboarding.enums.AvailabilityType;
import com.team19.CareConnect.onboarding.enums.DocumentType;
import com.team19.CareConnect.onboarding.repository.CaregiverRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OnboardingService {

    private final CaregiverRequestRepository caregiverRequestRepository;

    @Transactional
    public void processFormSubmission(GoogleFormsPayloadDTO payloadDTO) {

        CaregiverRequest request = new CaregiverRequest();

        AvailabilityType availability = AvailabilityType.fromLabel(payloadDTO.availabilityTime());

        FormInformation info = new FormInformation(
                payloadDTO.firstName() + " " + payloadDTO.lastName(),
                payloadDTO.phoneNumber(),
                payloadDTO.dateOfBirth(),
                availability,
                payloadDTO.specializations()
        );

        request.setFormInformation(info);

        addDocumentIfPresent(payloadDTO.dni(), DocumentType.NATIONAL_ID, request);
        addDocumentIfPresent(payloadDTO.criminalRecord(), DocumentType.CRIMINAL_RECORD, request);
        addDocumentIfPresent(payloadDTO.cuilCertificate(), DocumentType.CUIL_CERTIFICATE, request);
        addDocumentIfPresent(payloadDTO.medicalFitnessCert(), DocumentType.MEDICAL_FITNESS_CERT, request);

        caregiverRequestRepository.save(request);
    }

    private void addDocumentIfPresent(
            GoogleFormsPayloadDTO.FileMetadataDTO fileMetadata,
            DocumentType type,
            CaregiverRequest caregiverRequest
    ) {
        if(fileMetadata != null && fileMetadata.url() != null) {
            Document document = new Document();
            document.setDocumentType(type);
            document.setFileName(fileMetadata.name());
            document.setFilePath(fileMetadata.url());
            document.setFileSize(fileMetadata.size());
            document.setMimeType(fileMetadata.mimeType());

            caregiverRequest.addDocument(document);
        }
    }

}