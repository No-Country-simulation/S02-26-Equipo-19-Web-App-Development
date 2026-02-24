package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BankTransfer;
import com.team19.CareConnect.core.domain.caregiver.repository.IBankTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankTransferService implements IBankTransferService {

    @Autowired
    private IBankTransferRepository bankTransferRepository;

    @Override
    public BankTransfer findBankTransferById(Long bankId) {
        return null;
    }

    @Override
    public List<BankTransfer> findBankTransfersByCaregiverId(Long caregiverId) {
        return List.of();
    }

    @Override
    public void createBankTransfer(BankTransfer bankTransfer) {

    }

    @Override
    public void updateBankTransfer(Long bankId, String bankName, String accountHolderName, String cbu, String cvu, String alias, Boolean isActive) {

    }

    @Override
    public void deleteBankTransfer(Long bankId) {

    }
}
