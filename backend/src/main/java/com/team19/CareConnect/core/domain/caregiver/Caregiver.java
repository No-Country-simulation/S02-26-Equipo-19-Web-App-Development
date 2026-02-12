package com.team19.CareConnect.core.domain.caregiver;

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
public class Caregiver {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
    private String status;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @OneToOne
    @JoinColumn(name = "caregive_billing_info_id", referencedColumnName = "id")
    private BillingInformation billingInformation;

    @OneToMany(mappedBy = "caregiver")
    @JsonManagedReference
    private List<PayRate> payRate = new ArrayList<>();

    @OneToMany(mappedBy = "caregiver")
    @JsonManagedReference
    private List<PatientCaregiver> patientCaregiver = new ArrayList<>();
}
