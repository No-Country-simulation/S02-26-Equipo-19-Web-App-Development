package com.team19.CareConnect.core.domain.caregiver.dto.response;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaregiverResponseDto {
    private String caregiverDni;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private String phoneNumber;
    private String address;
    private BillingInformationResponseDto billingInformation;
    private PayRateResponseDto payRate;

}
