package com.team19.CareConnect.core.domain.admin.dto.update;

import com.team19.CareConnect.core.domain.patient.domain.GuardianStatus;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateGuardianDto {
    private String guardianDni;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private String password;
    private String phoneNumber;
    private String address;
    private GuardianStatus guardianStatus;

}
