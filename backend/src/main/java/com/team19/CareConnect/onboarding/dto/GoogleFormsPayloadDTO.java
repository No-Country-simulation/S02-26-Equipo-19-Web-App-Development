package com.team19.CareConnect.onboarding.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record GoogleFormsPayloadDTO(

        @JsonProperty("nombres")
        String firstName,

        @JsonProperty("apellidos")
        String lastName,

        @JsonProperty("marca_temporal")
        @JsonFormat(pattern = "d/M/yyyy HH:mm:ss")
        LocalDateTime sentAt,

        @JsonProperty("fecha_de_nacimiento")
        @JsonFormat(pattern = "d/M/yyyy")
        LocalDate dateOfBirth,

        @JsonProperty("numero_de_telefono")
        String phoneNumber,

        @JsonProperty("disponibilidad_de_tiempo")
        String availabilityTime,

        @JsonProperty("especializacion")
        String specializations,

        @JsonProperty("dni")
        FileMetadataDTO dni,

        @JsonProperty("antecedentes_penales")
        FileMetadataDTO criminalRecord,

        @JsonProperty("certificado_cuil")
        FileMetadataDTO cuilCertificate,

        @JsonProperty("certificado_medico")
        FileMetadataDTO medicalFitnessCert

        ) {

    public record FileMetadataDTO(
            String url,
            String name,
            Long size,
            @JsonProperty("mime_type")
            String mimeType
    ) {

        public FileMetadataDTO(String url) {
            this(url, null, null, null);
        }

    }
}
