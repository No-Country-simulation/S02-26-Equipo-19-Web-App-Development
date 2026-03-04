package com.team19.CareConnect.core.domain.admin.service;

import com.team19.CareConnect.core.domain.Role;
import com.team19.CareConnect.core.domain.admin.domain.Admin;
import com.team19.CareConnect.core.domain.admin.dto.create.CreateAdminDto;
import com.team19.CareConnect.core.domain.admin.dto.response.AdminResponseDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateAdminDto;
import com.team19.CareConnect.core.domain.admin.mapper.AdminMapper;
import com.team19.CareConnect.core.domain.admin.repository.IAdminRepository;
import com.team19.CareConnect.core.domain.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService implements  IAdminService {
    @Autowired
    private IAdminRepository adminRepository;

    @Override
    public void createAdmin(CreateAdminDto admin) {
        Admin adminEntity = new Admin();

        adminEntity.setFirstName(admin.getFirstName());
        adminEntity.setLastName(admin.getLastName());
        adminEntity.setEmail(admin.getEmail());
        adminEntity.setPassword(admin.getPassword());
        adminEntity.setIsActive(true);
        adminEntity.setRole(Role.ADMIN);
        adminEntity.setCreatedAt(LocalDateTime.now());
        adminEntity.setUpdatedAt(LocalDateTime.now());

        adminRepository.save(adminEntity);
    }

    @Override
    public AdminResponseDto getAdminById(Long adminId) {
        return adminRepository.findById(adminId)
                .map(AdminMapper::toDto)
                .orElseThrow(()->new ResourceNotFoundException("Admin not found"));
    }

    @Override
    public List<AdminResponseDto> getAllAdmins() {
        return adminRepository.findAll().stream().map(AdminMapper::toDto).toList();
    }

    @Override
    public void updateAdmin(Long adminId, UpdateAdminDto admin) {
        Admin adminEntity = adminRepository.findById(adminId)
                .orElseThrow(()->new ResourceNotFoundException("Admin not found"));

        Optional.ofNullable(admin.getFirstName()).ifPresent(adminEntity::setFirstName);
        Optional.ofNullable(admin.getLastName()).ifPresent(adminEntity::setLastName);
        Optional.ofNullable(admin.getEmail()).ifPresent(adminEntity::setEmail);
        Optional.ofNullable(admin.getPassword()).ifPresent(adminEntity::setPassword);
        Optional.ofNullable(admin.getIsActive()).ifPresent(adminEntity::setIsActive);
        adminEntity.setUpdatedAt(LocalDateTime.now());

        adminRepository.save(adminEntity);
    }

    @Override
    public void deleteAdminById(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}
