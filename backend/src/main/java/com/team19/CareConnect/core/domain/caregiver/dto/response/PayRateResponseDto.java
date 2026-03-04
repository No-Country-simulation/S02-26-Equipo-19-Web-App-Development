package com.team19.CareConnect.core.domain.caregiver.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayRateResponseDto {
    private BigDecimal hourlyPayRate;
    private LocalDateTime startDate;
}
