package com.team19.CareConnect.core.domain.patient.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuardianBasicResponseDto {
    private Long guardianId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
