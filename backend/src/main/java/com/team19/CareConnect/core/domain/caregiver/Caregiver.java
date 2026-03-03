package com.team19.CareConnect.core.domain.caregiver;

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
public class Caregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "caregiver_id")
    private Long id;
    private String caregiverDni;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private LocalDate birthDate;
    @Enumerated(EnumType.STRING)
    private CaregiverStatus caregiverStatus;
    private String address;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "billing_information_id")
    private BillingInformation billingInformation;

    @OneToMany(mappedBy = "caregiver")
    @JsonManagedReference
    private List<PayRate> payRate = new ArrayList<>();

    @OneToMany(mappedBy = "caregiver")
    @JsonManagedReference
    private List<PatientCaregiver> patientCaregiver = new ArrayList<>();
}
