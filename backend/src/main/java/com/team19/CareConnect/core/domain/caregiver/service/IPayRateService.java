package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.PayRate;

import java.util.List;

public interface IPayRateService {
    public void createPayRate(PayRate payRate);
    public PayRate findPayRateById(Long payRateId);
    public List<PayRate> findPayRateByCaregiverId(Long caregiverId);
    public void deletePayRate(Long payRateId);
}