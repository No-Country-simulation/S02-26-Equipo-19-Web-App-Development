package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.repository.IGuardianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuardianService implements IGuardianService{

    @Autowired
    private IGuardianRepository  guardianRepository;
}
