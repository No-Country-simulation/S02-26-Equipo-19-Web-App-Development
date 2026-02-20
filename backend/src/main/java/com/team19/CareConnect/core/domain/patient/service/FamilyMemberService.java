package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.repository.IFamilyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FamilyMemberService implements IFamilyMemberService {

    @Autowired
    private IFamilyMemberRepository familyMemberRepository;
}
