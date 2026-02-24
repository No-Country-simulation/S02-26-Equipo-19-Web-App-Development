package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BillingInformation;
import com.team19.CareConnect.core.domain.caregiver.domain.PreferredPaymentMethod;
import com.team19.CareConnect.core.domain.caregiver.repository.IBillingInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BillingInformationService implements IBillingInformationService {

    @Autowired
    private IBillingInformationRepository billingInformationRepository;

    @Override
    public void createBillingInformation(BillingInformation billingInformation) {

    }

    @Override
    public BillingInformation findBillingInformationById(Long billingInfoId) {
        return null;
    }

    @Override
    public void updateBillingInformation(Long billingInfoId, PreferredPaymentMethod preferredPaymentMethod, String currency, LocalDateTime updatedAt) {

    }

    @Override
    public void deleteBillingInformation(Long billingInfoId) {

    }
}
