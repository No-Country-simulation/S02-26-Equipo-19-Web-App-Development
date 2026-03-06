package com.team19.CareConnect.core.domain.admin.dto.create;

import lombok.*;

import java.time.LocalDate;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateGuardianRequestDto {
    private String guardianDni;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private String password;
    private String phoneNumber;
    private String address;
}
