package com.team19.CareConnect.onboarding.service;

import com.team19.CareConnect.onboarding.domain.CaregiverRequest;
import com.team19.CareConnect.onboarding.domain.FormInformation;
import com.team19.CareConnect.onboarding.dto.GoogleFormsPayloadDTO;
import com.team19.CareConnect.onboarding.enums.AvailabilityType;
import com.team19.CareConnect.onboarding.repository.CaregiverRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FormInformationService {
    private final CaregiverRequestRepository caregiverRequestRepository;

    public void processGoogleForm(GoogleFormsPayloadDTO dto) {

        AvailabilityType availabilityType = AvailabilityType.fromLabel(dto.disponibilidadDeTiempo());

        CaregiverRequest request = new CaregiverRequest();

        FormInformation form = new FormInformation(
                (dto.nombres() + " " + dto.apellidos()),
                dto.numeroDeTelefono(),
                dto.fechaDeNacimiento(),
                availabilityType,
                dto.especializacionPacientesEspeciales()
        );

        request.setFormInformation(form);
        caregiverRequestRepository.save(request);
    }
}
