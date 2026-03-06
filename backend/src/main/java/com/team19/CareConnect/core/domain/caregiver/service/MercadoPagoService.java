package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.MercadoPago;
import com.team19.CareConnect.core.domain.caregiver.repository.IMercadoPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MercadoPagoService implements IMercadoPagoService{

    @Autowired
    private IMercadoPagoRepository mercadoPagoRepository;

    @Override
    public void createMercadoPagoMethod(MercadoPago mercadoPago) {
        mercadoPagoRepository.save(mercadoPago);
    }

    @Override
    public MercadoPago findMercadoPagoMethodById(Long mercadoPagoId) {
        return mercadoPagoRepository.findById(mercadoPagoId).orElse(null);
    }


    @Override
    public void updateMercadoPagoMethod(Long mercadoPagoId,
                                        String mpEmail,
                                        String accountHolderName,
                                        Boolean isActive) {
        MercadoPago mercadoPago = mercadoPagoRepository.findById(mercadoPagoId).orElse(null);

        assert mercadoPago != null;

        Optional.ofNullable(mpEmail).ifPresent(mercadoPago::setMpEmail);
        Optional.ofNullable(accountHolderName).ifPresent(mercadoPago::setAccountHolderName);
        Optional.ofNullable(isActive).ifPresent(mercadoPago::setIsActive);

        mercadoPagoRepository.save(mercadoPago);
    }

    @Override
    public void deleteMercadoPagoMethod(Long mercadoPagoId) {
        mercadoPagoRepository.deleteById(mercadoPagoId);
    }
}
