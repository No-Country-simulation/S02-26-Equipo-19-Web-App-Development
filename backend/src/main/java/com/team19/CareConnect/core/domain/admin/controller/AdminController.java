package com.team19.CareConnect.core.domain.admin.controller;

import com.team19.CareConnect.core.domain.admin.dto.create.CreateAdminDto;
import com.team19.CareConnect.core.domain.admin.dto.response.AdminResponseDto;
import com.team19.CareConnect.core.domain.admin.dto.update.UpdateAdminDto;
import com.team19.CareConnect.core.domain.admin.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/me")
    public String createAdmin(@RequestBody CreateAdminDto admin) {
        adminService.createAdmin(admin);
        return "Admin created";
    }

    @GetMapping("/me/{adminId}")
    public AdminResponseDto  getAdminById(@PathVariable Long adminId) {
        return adminService.getAdminById(adminId);
    }

    @GetMapping("/me")
    public List<AdminResponseDto> getAllAdmins(){
        return adminService.getAllAdmins();
    }

    @PutMapping("/me/{adminId}")
    public String updateAdmin(@PathVariable Long adminId, @RequestBody UpdateAdminDto admin) {
        adminService.updateAdmin(adminId, admin);
        return "Admin updated";
    }

    @DeleteMapping("/me/{adminId}")
    public String deleteAdmin(@PathVariable Long adminId) {
        adminService.deleteAdminById(adminId);
        return "Admin deleted";
    }
}
