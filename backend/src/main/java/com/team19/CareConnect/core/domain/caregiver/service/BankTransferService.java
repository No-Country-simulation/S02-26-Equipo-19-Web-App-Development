package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BankTransfer;
import com.team19.CareConnect.core.domain.caregiver.repository.IBankTransferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BankTransferService implements IBankTransferService {

    @Autowired
    private IBankTransferRepository bankTransferRepository;

    @Override
    public BankTransfer findBankTransferById(Long bankId) {
        return bankTransferRepository.findById(bankId).orElse(null);
    }

    @Override
    public List<BankTransfer> findBankTransfersByCaregiverId(Long caregiverId) {
        return bankTransferRepository.findAllByCaregiverId(caregiverId);
    }

    @Override
    public void createBankTransfer(BankTransfer bankTransfer) {
        bankTransferRepository.save(bankTransfer);
    }

    @Override
    public void updateBankTransfer(Long bankId,
                                   String bankName,
                                   String accountHolderName,
                                   String cbu,
                                   String cvu,
                                   String alias,
                                   Boolean isActive) {
        BankTransfer bankTransfer = bankTransferRepository.findById(bankId).orElse(null);

        assert bankTransfer != null;

        Optional.ofNullable(bankName).ifPresent(bankTransfer::setBankName);
        Optional.ofNullable(accountHolderName).ifPresent(bankTransfer::setAccountHolderName);
        Optional.ofNullable(cbu).ifPresent(bankTransfer::setCbu);
        Optional.ofNullable(cvu).ifPresent(bankTransfer::setCvu);
        Optional.ofNullable(alias).ifPresent(bankTransfer::setAlias);
        Optional.ofNullable(isActive).ifPresent(bankTransfer::setIsActive);

        bankTransferRepository.save(bankTransfer);
    }

    @Override
    public void deleteBankTransfer(Long bankId) {
        bankTransferRepository.deleteById(bankId);
    }
}
