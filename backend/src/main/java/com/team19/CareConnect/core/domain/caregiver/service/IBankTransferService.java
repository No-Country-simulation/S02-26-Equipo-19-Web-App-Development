package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BankTransfer;

import java.util.List;

public interface IBankTransferService {

    public BankTransfer findBankTransferById(Long bankId);
    public void createBankTransfer (BankTransfer bankTransfer);
    public void updateBankTransfer(
            Long bankId,
            String bankName,
            String accountHolderName,
            String cbu,
            String cvu,
            String alias,
            Boolean isActive);
    public void deleteBankTransfer(Long bankId);
}
