CREATE TABLE payroll_periods (
                                 id BIGSERIAL PRIMARY KEY,
                                 month DATE NOT NULL,
                                 start_date DATE NOT NULL,
                                 end_date DATE NOT NULL,
                                 is_open BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE payment_reports (
                                 id BIGSERIAL PRIMARY KEY,
                                 payroll_period_id BIGINT NOT NULL,
                                 caregiver_id BIGINT NOT NULL,
                                 total_time_mins BIGINT NOT NULL,
                                 total_amount DECIMAL(12, 2) NOT NULL,
                                 pay_report_status VARCHAR(50) NOT NULL,
                                 generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 CONSTRAINT fk_payroll_period FOREIGN KEY (payroll_period_id) REFERENCES payroll_periods(id),
                                 CONSTRAINT uk_period_caregiver UNIQUE (payroll_period_id, caregiver_id)
);

CREATE TABLE payments (
                          id BIGSERIAL PRIMARY KEY,
                          payment_report_id BIGINT NOT NULL UNIQUE,
                          payment_method VARCHAR(50) NOT NULL,
                          payment_status VARCHAR(50) NOT NULL,
                          initiated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          completed_at TIMESTAMP,
                          transaction_reference VARCHAR(255),
                          CONSTRAINT fk_payment_report FOREIGN KEY (payment_report_id) REFERENCES payment_reports(id)
);
