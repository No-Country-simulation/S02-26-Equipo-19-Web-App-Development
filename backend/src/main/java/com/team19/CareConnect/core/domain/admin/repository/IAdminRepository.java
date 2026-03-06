package com.team19.CareConnect.core.domain.admin.repository;

import com.team19.CareConnect.core.domain.admin.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdminRepository extends JpaRepository<Admin,Long> {
}
