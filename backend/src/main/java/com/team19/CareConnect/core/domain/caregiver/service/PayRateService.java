package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.PayRate;
import com.team19.CareConnect.core.domain.caregiver.repository.IPayRateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PayRateService implements IPayRateService {

    @Autowired
    private IPayRateRepository payRateRepository;

    @Override
    public void createPayRate(PayRate payRate) {

    }

    @Override
    public PayRate findPayRateById(Long payRateId) {
        return null;
    }

    @Override
    public List<PayRate> findPayRateByCaregiverId(Long caregiverId) {
        return List.of();
    }

    @Override
    public void deletePayRate(Long payRateId) {

    }
}
