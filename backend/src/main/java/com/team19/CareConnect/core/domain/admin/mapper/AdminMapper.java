package com.team19.CareConnect.core.domain.admin.mapper;

import com.team19.CareConnect.core.domain.admin.domain.Admin;
import com.team19.CareConnect.core.domain.admin.dto.response.AdminResponseDto;

public class AdminMapper {

    public static AdminResponseDto toDto(Admin admin) {
        if (admin == null) {return null;}

        return AdminResponseDto.builder()
                .firstName(admin.getFirstName())
                .lastName(admin.getLastName())
                .email(admin.getEmail())
                .build();
    }
}
