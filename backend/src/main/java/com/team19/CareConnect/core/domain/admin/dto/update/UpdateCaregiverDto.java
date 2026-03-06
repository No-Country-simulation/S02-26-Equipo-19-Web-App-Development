package com.team19.CareConnect.core.domain.admin.dto.update;

import com.team19.CareConnect.core.domain.caregiver.domain.CaregiverStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCaregiverDto {
    private String caregiverDni;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private LocalDate birthDate;
    private String address;
    private CaregiverStatus caregiverStatus;
}
