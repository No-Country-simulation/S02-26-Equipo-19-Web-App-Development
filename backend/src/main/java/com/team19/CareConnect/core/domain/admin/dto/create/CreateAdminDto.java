package com.team19.CareConnect.core.domain.admin.dto.create;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateAdminDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}