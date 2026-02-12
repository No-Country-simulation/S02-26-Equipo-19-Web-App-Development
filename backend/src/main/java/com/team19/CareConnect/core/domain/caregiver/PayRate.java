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
public class PayRate {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "caregiver_id")
    @JsonBackReference
    private Caregiver caregiver;
    
    private Double rate;

    private Boolean isActive;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
