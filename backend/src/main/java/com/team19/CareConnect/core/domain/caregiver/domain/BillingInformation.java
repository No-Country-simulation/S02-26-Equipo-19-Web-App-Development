package com.team19.CareConnect.core.domain.caregiver.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class BillingInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billing_information_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private PreferredPaymentMethod preferredPaymentMethod;
    private String currency;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "billingInformation")
    @JsonManagedReference
    private List<MercadoPago> mercadoPagoList;

    @OneToMany(mappedBy = "billingInformation")
    @JsonManagedReference
    private List<BankTransfer> bankTransferList;

}
