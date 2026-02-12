package com.team19.CareConnect.core.domain.caregiver;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class BankTransfer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "billing_information_id")
    @JsonBackReference
    private BillingInformation billingInformation;

    private String bankName;
    private String accountHolderName;
    private String cbu;
    private String cvu;
    private String alias;
    private String isActive;
    private LocalDateTime createdAt;

}
