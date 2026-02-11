package com.team19.CareConnect.core.domain.patient;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    @OneToMany(mappedBy = "familyMember")
    @JsonManagedReference
    private List<PatientSecondaryContact> secondaryContacts = new ArrayList<>();
}
