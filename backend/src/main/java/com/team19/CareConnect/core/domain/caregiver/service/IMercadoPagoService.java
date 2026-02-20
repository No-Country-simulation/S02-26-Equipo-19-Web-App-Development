package com.team19.CareConnect.core.domain.caregiver.service;

import com.team19.CareConnect.core.domain.caregiver.domain.MercadoPago;

import java.util.List;

public interface IMercadoPagoService {
    public void createMercadoPagoMethod(MercadoPago mercadoPago);
    public MercadoPago findMercadoPagoMethodById(Long mercadoPagoId);
    public List<MercadoPago>  findAllMercadoPagoMethodsByCaregiverId(Long caregiverId);
    public void updateMercadoPagoMethod(
            Long mercadoPagoId,
            String mpEmail,
            String accountHolderName,
            Boolean isActive);
    public void deleteMercadoPagoMethod(Long mercadoPagoId);
}
