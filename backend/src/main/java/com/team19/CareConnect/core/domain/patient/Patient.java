package com.team19.CareConnect.core.domain.patient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team19.CareConnect.core.domain.PatientCaregiver;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long id;
    private String patientDni;
    private LocalDateTime birthDate;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    @Enumerated(EnumType.STRING)
    private PatientStatus patientStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "guardian_patient_id")
    @JsonBackReference
    private Guardian guardian;

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<PatientSecondaryContact> secondaryContacts = new ArrayList<>();

    @OneToMany(mappedBy = "patient")
    @JsonManagedReference
    private List<PatientCaregiver> patientCaregiver = new ArrayList<>();
}