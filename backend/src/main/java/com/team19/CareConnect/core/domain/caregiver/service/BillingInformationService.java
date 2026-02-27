package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BillingInformation;
import com.team19.CareConnect.core.domain.caregiver.domain.PreferredPaymentMethod;
import com.team19.CareConnect.core.domain.caregiver.repository.IBillingInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BillingInformationService implements IBillingInformationService {

    @Autowired
    private IBillingInformationRepository billingInformationRepository;

    @Override
    public void createBillingInformation(BillingInformation billingInformation) {
        billingInformationRepository.save(billingInformation);
    }

    @Override
    public BillingInformation findBillingInformationById(Long billingInfoId) {

        return billingInformationRepository.findById(billingInfoId).orElse(null);
    }

    @Override
    public BillingInformation findBillingInformationByCaregiverId(Long caregiverId) {
        return billingInformationRepository.findByCaregiverId(caregiverId);
    }

    @Override
    public void updateBillingInformation(Long billingInfoId,
                                         PreferredPaymentMethod preferredPaymentMethod,
                                         String currency,
                                         LocalDateTime updatedAt) {
        BillingInformation billingInformation = findBillingInformationById(billingInfoId);

        assert billingInformation != null;
        Optional.ofNullable(preferredPaymentMethod).ifPresent(billingInformation::setPreferredPaymentMethod);
        Optional.ofNullable(currency).ifPresent(billingInformation::setCurrency);
        billingInformation.setUpdatedAt(LocalDateTime.now());

        billingInformationRepository.save(billingInformation);
    }

    @Override
    public void deleteBillingInformation(Long billingInfoId) {
        billingInformationRepository.deleteById(billingInfoId);
    }
}
