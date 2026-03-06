package com.team19.CareConnect.core.domain.caregiver.repository;

import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICaregiverRepository extends JpaRepository<Caregiver, Long> {
}
