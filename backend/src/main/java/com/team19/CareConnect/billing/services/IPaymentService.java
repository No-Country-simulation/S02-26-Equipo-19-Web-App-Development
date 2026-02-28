package com.team19.CareConnect.billing.services;

import java.util.List;

import com.team19.CareConnect.billing.domain.Payment;
import com.team19.CareConnect.billing.domain.enums.PaymentMethod;
import com.team19.CareConnect.billing.domain.enums.PaymentStatus;

public interface IPaymentService {

    Payment initiatePayment(Long paymentReportId, PaymentMethod method);

    void completePayment(Long paymentId, String transactionReference);

    Payment getById(Long paymentId);

    void failPayment(Long paymentId);

    List<Payment> getByStatus(PaymentStatus status);
}