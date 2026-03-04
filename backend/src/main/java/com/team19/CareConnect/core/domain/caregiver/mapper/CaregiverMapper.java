package com.team19.CareConnect.core.domain.caregiver.mapper;

import com.team19.CareConnect.core.domain.caregiver.domain.BillingInformation;
import com.team19.CareConnect.core.domain.caregiver.domain.Caregiver;
import com.team19.CareConnect.core.domain.caregiver.domain.PayRate;
import com.team19.CareConnect.core.domain.caregiver.dto.response.BillingInformationResponseDto;
import com.team19.CareConnect.core.domain.caregiver.dto.response.CaregiverResponseDto;
import com.team19.CareConnect.core.domain.caregiver.dto.response.PayRateResponseDto;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class CaregiverMapper {

    //Mapeo de Caregiver a CaregiverResponseDto

    public static CaregiverResponseDto toDto(Caregiver caregiver) {
        if (caregiver == null) return null;

        return CaregiverResponseDto.builder()
                .caregiverDni(caregiver.getCaregiverDni())
                .firstName(caregiver.getFirstName())
                .lastName(caregiver.getLastName())
                .email(caregiver.getEmail())
                .birthDate(caregiver.getBirthDate())
                .phoneNumber(caregiver.getPhoneNumber())
                .address(caregiver.getAddress())
                .billingInformation(Optional.ofNullable(caregiver.getBillingInformation())
                        .map(CaregiverMapper::toDto)
                        .orElse(null))
                .payRate(Optional.ofNullable(caregiver.getPayRate()).map(CaregiverMapper::toDto).orElse(null))
                .build();
    }

    public static BillingInformationResponseDto toDto(BillingInformation billingInformation) {
        if (billingInformation == null) return null;

        return BillingInformationResponseDto.builder()
                .preferredPaymentMethod(billingInformation.getPreferredPaymentMethod())
                .currency(billingInformation.getCurrency())
                .updatedAt(billingInformation.getUpdatedAt())
                .build();
    }

    public static PayRateResponseDto toDto(List<PayRate> payRate) {
        if (payRate == null) return null;

        PayRate currentPayRate = payRate.stream().max(Comparator.comparing(PayRate::getStartDate))
                .orElse(null);

        if (currentPayRate == null) return null;

        return PayRateResponseDto.builder()
                .hourlyPayRate(currentPayRate.getHourlyPayRate())
                .startDate(currentPayRate.getStartDate())
                .build();
    }
}
