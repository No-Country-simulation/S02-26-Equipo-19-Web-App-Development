

CREATE TABLE caregiver_report (

report_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
patient_caregiver_id BIGINT,
report_date_start DATE,
report_date_end DATE,
report_content TEXT,
observations TEXT,
status VARCHAR(30) ,
CONSTRAINT fk_caregiver_report FOREIGN KEY (patient_caregiver_id)
    REFERENCES patient_caregiver(patient_caregiver_id)
);

CREATE TABLE caregiver_report_document
(
    doc_report_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    report_id     BIGINT,
    file_url      TEXT,
    file_type     VARCHAR(30),
    mime_type     VARCHAR(100),
    uploaded_at   DATE,
    CONSTRAINT fk_caregiver_report_document FOREIGN KEY (report_id)
        REFERENCES caregiver_report(report_id)
);
--4