CREATE TABLE caregiver_request (
    application_id BIGINT GENERATED ALWAYS AS IDENTITY,
    application_status VARCHAR(30) NOT NULL,
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ,
    reviewed_by BIGINT,
    rejection_reason TEXT,
    spread_sheet_id TEXT
)