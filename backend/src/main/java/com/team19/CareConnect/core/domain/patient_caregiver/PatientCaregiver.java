package com.team19.CareConnect.core.domain.patient_caregiver;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import com.team19.CareConnect.core.domain.patient.domain.Patient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class PatientCaregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_caregiver_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "caregiver_id", nullable = false)
    @JsonBackReference
    private Caregiver caregiver;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonBackReference
    private Patient patient;
}
