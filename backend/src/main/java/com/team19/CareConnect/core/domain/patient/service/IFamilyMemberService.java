package com.team19.CareConnect.core.domain.patient.service;

import com.team19.CareConnect.core.domain.patient.domain.FamilyMember;

import java.util.List;

public interface IFamilyMemberService {

    public void createFamilyMember(FamilyMember familyMember);
    public FamilyMember findFamilyMemberById(Long familyMemberId);
    public void updateFamilyMember(
            Long familyMemberId,
            String firstName,
            String lastName,
            String phoneNumber,
            String email
    );
    public void deleteFamilyMember(Long familyMemberId);

}
