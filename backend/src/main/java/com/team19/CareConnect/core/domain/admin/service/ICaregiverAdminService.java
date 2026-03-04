package com.team19.CareConnect.core.domain.admin.service;
import com.team19.CareConnect.core.domain.admin.dto.create.CreateCaregiverDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateCaregiverDto;
import com.team19.CareConnect.core.domain.caregiver.dto.response.CaregiverResponseDto;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ICaregiverAdminService {
    public void createCaregiver(CreateCaregiverDto caregiver);
    public CaregiverResponseDto getCaregiverById(Long caregiverId);
    public List<CaregiverResponseDto> getCaregivers();
    public void updateCaregiver(Long caregiverId, UpdateCaregiverDto caregiver);
    public void deleteCaregiver(Long caregiverId);
}