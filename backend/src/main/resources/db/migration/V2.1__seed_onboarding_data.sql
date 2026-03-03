INSERT INTO admin (first_name, last_name, email, password, is_active, created_at, updated_at)
VALUES
    ('Carlos', 'Lopez', 'carlos.lopez@example.com', 'password_hash_1', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO caregiver_request (application_status, submitted_at, reviewed_at, rejection_reason, spread_sheet_id, reviewed_by)
VALUES
    ('PENDING', CURRENT_TIMESTAMP, NULL, NULL, 'sheet_001', NULL);

INSERT INTO document (document_type, file_name, file_path, file_size, mime_type, uploaded_at, is_verified, application_id)
VALUES
    ('CUIL_CERTIFICATE', 'CUIL2 - Logan Yoshua Leonardo Pariona Inga.pdf', 'https://drive.google.com/open?id=14HmNfgHwzhBS1OCMLrVgVxnEdS7lInMy', 1979, 'application/pdf', CURRENT_TIMESTAMP, FALSE, 1);
INSERT INTO form_information (application_id, full_name, phone_number, date_of_birth, availability_type, specializations)
VALUES
    (1, 'Yoshua Pariona', '+51123456789', '1998-07-12', 'WEEKENDS', 'Parkinson');