package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.BillingInformation;
import com.team19.CareConnect.core.domain.caregiver.domain.PreferredPaymentMethod;

import java.time.LocalDateTime;

public interface IBillingInformationService {

    public void createBillingInformation(BillingInformation billingInformation);
    public BillingInformation findBillingInformationById(Long billingInfoId);
    public void updateBillingInformation (
            Long billingInfoId,
            PreferredPaymentMethod preferredPaymentMethod,
            String currency,
            LocalDateTime updatedAt);
    public void deleteBillingInformation(Long billingInfoId);
}