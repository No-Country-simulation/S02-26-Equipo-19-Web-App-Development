package com.team19.CareConnect.onboarding.repository;

import com.team19.CareConnect.onboarding.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
