package com.team19.CareConnect.core.domain.patient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team19.CareConnect.core.domain.PatientCaregiver;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String patientDni;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private PatientStatus patientStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    @JsonBackReference
    private Guardian guardian;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<PatientSecondaryContact> secondaryContacts = new ArrayList<>();

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<PatientCaregiver> patientCaregiver = new ArrayList<>();
}