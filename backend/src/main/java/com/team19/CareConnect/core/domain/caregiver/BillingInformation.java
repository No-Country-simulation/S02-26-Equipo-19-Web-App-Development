package com.team19.CareConnect.core.domain.caregiver;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private PreferredPayMethod preferredPayMethod;
    private String currency;
    private Boolean isActive;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    @OneToMany(mappedBy = "billingInformation")
    @JsonManagedReference
    private List<MercadoPago> mercadoPagoList;

    @OneToMany(mappedBy = "billingInformation")
    @JsonManagedReference
    private List<BankTransfer> bankTransferList;

}
