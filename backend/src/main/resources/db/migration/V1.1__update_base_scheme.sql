CREATE TYPE preferred_payment_method AS ENUM('MERCADOPAGO', 'BANK_TRANSFER');

CREATE TYPE caregiver_status AS ENUM('ACTIVE', 'INACTIVE');

CREATE TYPE guardian_status AS ENUM('ACTIVE', 'INACTIVE');

CREATE TYPE patient_status AS ENUM('ACTIVE', 'INACTIVE');

ALTER TABLE billing_information
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ,
    ALTER COLUMN preferred_payment_method TYPE preferred_payment_method USING preferred_payment_method::preferred_payment_method;

ALTER TABLE caregiver
    RENAME COLUMN status TO caregiver_status;

ALTER TABLE caregiver
    ALTER COLUMN birth_date TYPE DATE,
    ALTER COLUMN caregiver_status TYPE caregiver_status USING caregiver_status::caregiver_status,
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;



ALTER TABLE bank_transfer
    ALTER COLUMN created_at TYPE TIMESTAMPTZ;

ALTER TABLE mercado_pago
    ALTER COLUMN created_at TYPE TIMESTAMPTZ;

ALTER TABLE pay_rate
    ALTER COLUMN start_date TYPE TIMESTAMPTZ,
    ALTER COLUMN end_date TYPE TIMESTAMPTZ;

ALTER TABLE guardian
    ALTER COLUMN birth_date TYPE DATE,
    ALTER COLUMN guardian_status TYPE guardian_status USING guardian_status::guardian_status,
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;

ALTER TABLE patient
    ALTER COLUMN birth_date TYPE DATE,
    ALTER COLUMN patient_status TYPE patient_status USING patient_status::patient_status,
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;

ALTER TABLE admin
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;