package com.team19.CareConnect.billing.domain;

import com.team19.CareConnect.billing.domain.enums.PaymentReportStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "payment_reports",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"payroll_period_id", "caregiver_id"})
        }
)
public class PaymentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "payroll_period_id")
    private PayrollPeriod payrollPeriod;

    @Column(name = "caregiver_id", nullable = false)
    private Long caregiverId;

    @Column(name = "total_time_mins", nullable = false)
    private Long totalTimeMins;

    @Column(name = "total_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "pay_report_status", nullable = false)
    private PaymentReportStatus status;

    @Column(name = "generated_at", nullable = false)
    private LocalDateTime generatedAt;
}