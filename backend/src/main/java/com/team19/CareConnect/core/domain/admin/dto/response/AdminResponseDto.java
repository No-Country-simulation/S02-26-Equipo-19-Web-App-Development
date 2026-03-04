package com.team19.CareConnect.core.domain.admin.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminResponseDto {
    private String firstName;
    private String lastName;
    private String email;
}
