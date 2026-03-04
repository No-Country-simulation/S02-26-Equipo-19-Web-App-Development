package com.team19.CareConnect.core.domain.admin.dto.create;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCaregiverDto {
    private String caregiverDni;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private LocalDate birthDate;
    private String address;
}
