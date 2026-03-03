CREATE TABLE billing_information
(
    billing_information_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    preferred_payment_method VARCHAR(30) CHECK ( preferred_payment_method IN ('MERCADOPAGO', 'BANK_TRANSFER')),
    currency                 VARCHAR(3),
    updated_at               TIMESTAMP
);

CREATE TABLE caregiver
(
    caregiver_id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    caregiver_dni          VARCHAR(15) UNIQUE,
    first_name             VARCHAR(50),
    last_name              VARCHAR(50),
    email                  VARCHAR(255) UNIQUE,
    phone_number           VARCHAR(50),
    password               VARCHAR(255) NOT NULL,
    birth_date             TIMESTAMP,
    status                 VARCHAR(25) CHECK (status IN ('ACTIVE', 'INACTIVE')),
    address                TEXT,
    created_at             TIMESTAMP,
    updated_at             TIMESTAMP,
    billing_information_id BIGINT,
    CONSTRAINT fk_billing_information
        FOREIGN KEY (billing_information_id)
        REFERENCES "billing_information"(billing_information_id)
);

CREATE TABLE bank_transfer
(
    bank_payment_method_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    billing_information_id        BIGINT,
    bank_name              VARCHAR(100),
    account_holder_name    VARCHAR(100),
    cbu                    VARCHAR(22),
    cvu                    VARCHAR(22),
    alias                  VARCHAR(50),
    is_active              BOOLEAN,
    created_at             TIMESTAMP,
    CONSTRAINT fk_bank_transfer_billing_information
        FOREIGN KEY (billing_information_id)
        REFERENCES "billing_information"(billing_information_id)
);

CREATE TABLE mercado_pago
(
    mp_method_id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    billing_information_id     BIGINT,
    mp_email            VARCHAR(255),
    account_holder_name VARCHAR(100),
    is_active           BOOLEAN,
    created_at          TIMESTAMP,
    CONSTRAINT fk_mp_billing_information
        FOREIGN KEY (billing_information_id)
        REFERENCES "billing_information"(billing_information_id)
);

CREATE TABLE pay_rate
(
    pay_rate_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    caregiver_id    BIGINT,
    hourly_pay_rate DECIMAL(12, 2),
    start_date      TIMESTAMP,
    end_date        TIMESTAMP,
    CONSTRAINT fk_caregiver
        FOREIGN KEY (caregiver_id)
        REFERENCES "caregiver" (caregiver_id)
);

CREATE TABLE guardian
(
    guardian_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    guardian_dni    VARCHAR(15) UNIQUE,
    first_name      VARCHAR(50) NOT NULL,
    last_name       VARCHAR(50) NOT NULL,
    email           VARCHAR(255) UNIQUE,
    birth_date      TIMESTAMP,
    password        VARCHAR(255) NOT NULL,
    phone_number    VARCHAR(50) NOT NULL,
    address         TEXT,
    guardian_status VARCHAR(30) CHECK ( guardian_status IN ('ACTIVE', 'INACTIVE')),
    created_at      TIMESTAMP,
    updated_at      TIMESTAMP
);

CREATE TABLE patient
(
    patient_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_dni    VARCHAR(15) UNIQUE,
    birth_date     TIMESTAMP,
    first_name     VARCHAR(50) NOT NULL,
    last_name      VARCHAR(50) NOT NULL,
    email          VARCHAR(255),
    phone_number   VARCHAR(50),
    address        TEXT,
    patient_status VARCHAR(20) CHECK (patient_status IN ('ACTIVE', 'INACTIVE')),
    created_at     TIMESTAMP,
    updated_at     TIMESTAMP,
    guardian_patient_id    BIGINT,
    CONSTRAINT fk_guardian
        FOREIGN KEY (guardian_patient_id)
        REFERENCES "guardian" (guardian_id)
);

CREATE TABLE patient_caregiver
(
    patient_caregiver_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    caregiver_id BIGINT,
    patient_id BIGINT,
    CONSTRAINT fk_caregiver
        FOREIGN KEY (caregiver_id)
        REFERENCES "caregiver"(caregiver_id),
    CONSTRAINT fk_patient
        FOREIGN KEY (patient_id)
        REFERENCES "patient"(patient_id)
);

CREATE TABLE family_member
(
    family_member_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name       VARCHAR(50),
    last_name        VARCHAR(50),
    phone_number     VARCHAR(50),
    email            VARCHAR(255)
);

CREATE TABLE patient_secondary_contact
(
    secondary_contact_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    patient_id           BIGINT,
    family_member_id     BIGINT,
    relationship_type    VARCHAR(30),
    is_preferred_contact   BOOLEAN,
    CONSTRAINT fk_patient_sec_contact_patient
        FOREIGN KEY (patient_id)
        REFERENCES "patient"(patient_id),
    CONSTRAINT fk_family_member
        FOREIGN KEY (family_member_id)
        REFERENCES "family_member"(family_member_id)
);

CREATE TABLE admin
(
    admin_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name    VARCHAR(100),
    last_name     VARCHAR(100),
    email         VARCHAR(255),
    password      VARCHAR(255) NOT NULL,
    is_active     BOOLEAN,
    created_at    TIMESTAMP,
    updated_at    TIMESTAMP
);