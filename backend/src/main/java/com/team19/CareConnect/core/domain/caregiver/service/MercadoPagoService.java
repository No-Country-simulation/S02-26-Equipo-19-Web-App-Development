package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.MercadoPago;
import com.team19.CareConnect.core.domain.caregiver.repository.ICaregiverRepository;
import com.team19.CareConnect.core.domain.caregiver.repository.IMercadoPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MercadoPagoService implements IMercadoPagoService{

    @Autowired
    private IMercadoPagoRepository mercadoPagoRepository;

    @Override
    public void createMercadoPagoMethod(MercadoPago mercadoPago) {

    }

    @Override
    public MercadoPago findMercadoPagoMethodById(Long mercadoPagoId) {
        return null;
    }

    @Override
    public List<MercadoPago> findAllMercadoPagoMethodsByCaregiverId(Long caregiverId) {
        return List.of();
    }

    @Override
    public void updateMercadoPagoMethod(Long mercadoPagoId, String mpEmail, String accountHolderName, Boolean isActive) {

    }

    @Override
    public void deleteMercadoPagoMethod(Long mercadoPagoId) {

    }
}
