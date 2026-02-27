package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.FamilyMember;
import com.team19.CareConnect.core.domain.patient.repository.IFamilyMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyMemberService implements IFamilyMemberService {

    @Autowired
    private IFamilyMemberRepository familyMemberRepository;

    @Override
    public void createFamilyMember(FamilyMember familyMember) {
        familyMemberRepository.save(familyMember);
    }

    @Override
    public FamilyMember findFamilyMemberById(Long familyMemberId) {
        return familyMemberRepository.findById(familyMemberId).orElse(null);
    }

    @Override
    public List<FamilyMember> findAllByPatientId(Long patientId) {
        return familyMemberRepository.findAllByPatientId(patientId);
    }

    @Override
    public void updateFamilyMember(Long familyMemberId,
                                   String firstName,
                                   String lastName,
                                   String phoneNumber,
                                   String email) {
        FamilyMember familyMember = familyMemberRepository.findById(familyMemberId).orElse(null);

        assert  familyMember != null;
        Optional.ofNullable(firstName).ifPresent(familyMember::setFirstName);
        Optional.ofNullable(lastName).ifPresent(familyMember::setLastName);
        Optional.ofNullable(phoneNumber).ifPresent(familyMember::setPhoneNumber);
        Optional.ofNullable(email).ifPresent(familyMember::setEmail);

        familyMemberRepository.save(familyMember);
    }

    @Override
    public void deleteFamilyMember(Long familyMemberId) {
        familyMemberRepository.deleteById(familyMemberId);
    }
}
