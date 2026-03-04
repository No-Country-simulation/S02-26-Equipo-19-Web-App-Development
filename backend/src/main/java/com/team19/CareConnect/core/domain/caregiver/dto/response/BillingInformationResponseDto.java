package com.team19.CareConnect.core.domain.caregiver.dto.response;

import com.team19.CareConnect.core.domain.caregiver.domain.PreferredPaymentMethod;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillingInformationResponseDto {
    private PreferredPaymentMethod preferredPaymentMethod;
    private String currency;
    private LocalDateTime updatedAt;
}
