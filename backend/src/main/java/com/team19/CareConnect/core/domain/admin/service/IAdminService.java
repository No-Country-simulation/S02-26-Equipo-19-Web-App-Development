package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.admin.dto.create.CreateAdminDto;
import com.team19.CareConnect.core.domain.admin.dto.response.AdminResponseDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateAdminDto;

import java.util.List;

public interface IAdminService {
    public void createAdmin(CreateAdminDto admin);
    public AdminResponseDto getAdminById(Long adminId);
    public List<AdminResponseDto> getAllAdmins();
    public void updateAdmin(Long adminId, UpdateAdminDto admin);
    public void deleteAdminById(Long adminId);
}
