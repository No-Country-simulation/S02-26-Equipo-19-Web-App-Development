package com.team19.CareConnect.core.domain.caregiver;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class MercadoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "billing_information_id")
    @JsonBackReference
    private BillingInformation billingInformation;

    private String mpEmail;
    private String accountHolderName;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
