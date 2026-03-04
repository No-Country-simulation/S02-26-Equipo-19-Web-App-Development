package com.team19.CareConnect.core.domain.admin.dto.update;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAdminDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Boolean isActive;
}
