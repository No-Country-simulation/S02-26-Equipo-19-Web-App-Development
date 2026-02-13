package com.team19.CareConnect.core.domain.caregiver;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class PayRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_rate_id")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "caregiver_id")
    @JsonBackReference
    private Caregiver caregiver;
    
    private BigDecimal hourlyPayRate;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
