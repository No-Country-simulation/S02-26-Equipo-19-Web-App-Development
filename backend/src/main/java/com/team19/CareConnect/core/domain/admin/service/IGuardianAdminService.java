package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.admin.dto.update.UpdateGuardianDto;
import com.team19.CareConnect.core.domain.admin.dto.create.CreateGuardianRequestDto;
import com.team19.CareConnect.core.domain.patient.dto.response.GuardianResponseDto;

import java.util.List;

public interface IGuardianAdminService {
    public void createGuardian(CreateGuardianRequestDto guardian);
    public GuardianResponseDto getGuardianById(Long guardianId);
    public List<GuardianResponseDto> getAllGuardians();
    public void updateGuardian(Long guardianId, UpdateGuardianDto  updateGuardianDto);
    public void deleteGuardian(Long guardianId);
}
