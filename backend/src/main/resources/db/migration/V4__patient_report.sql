ALTER TABLE caregiver_report_document
    ALTER COLUMN file_type TYPE file_type USING file_type::file_type;