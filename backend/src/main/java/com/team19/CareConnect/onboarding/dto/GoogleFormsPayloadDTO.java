package com.team19.CareConnect.onboarding.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.Instant;
import java.time.LocalDate;

public record GoogleFormsPayloadDTO(
    String nombres,

    String apellidos,

    @JsonProperty("numero_de_telefono")
    String numeroDeTelefono,

    @JsonProperty("fecha_de_nacimiento")
    LocalDate fechaDeNacimiento,

    @JsonProperty("disponibilidad_de_tiempo")
    String disponibilidadDeTiempo,

    @JsonProperty("indique_si_tiene_una_especializacion_en_pacientes_especiales_ej_diabetes_alzheimer_parkinson_etc")
    String especializacionPacientesEspeciales
) {
}
