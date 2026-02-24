package com.team19.CareConnect.core.domain.patient.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class PatientSecondaryContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "secondary_contact_id")
    private Long id;
    private Boolean isPreferredContact;
    private String relationshipType;

    @ManyToOne
    @JoinColumn(name = "family_member_id")
    @JsonBackReference
    private FamilyMember familyMember;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Patient patient;
}
