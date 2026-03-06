INSERT INTO patient (
    patient_dni,
    birth_date,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    patient_status,
    created_at,
    updated_at,
    guardian_patient_id
)
VALUES
    ('40111222','1995-03-14','Sofía','Martínez','sofia.martinez@email.com','2235011122','Av. Colón 123','ACTIVE',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL),

    ('38999888','1988-07-22','Diego','Fernández','diego.fernandez@email.com','2235022233','San Martín 456','ACTIVE',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL),

    ('41222333','2001-11-05','Camila','Rodríguez','camila.rodriguez@email.com','2235033344','Independencia 789','ACTIVE',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL),

    ('37777444','1999-01-30','Lucas','Gómez','lucas.gomez@email.com','2235044455','Luro 321','ACTIVE',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL),

    ('36555666','1992-09-18','Valentina','Pérez','valentina.perez@email.com','2235055566','Rivadavia 654','ACTIVE',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,NULL);

INSERT INTO caregiver (
    caregiver_dni,
    first_name,
    last_name,
    email,
    phone_number,
    password,
    birth_date,
    caregiver_status,
    address,
    billing_information_id
) VALUES
      (
          '30111222',
          'Ana',
          'Rodriguez',
          'ana.rodriguez@mail.com',
          '+5492234567890',
          '$2a$10$abc123hash',
          '1988-04-12',
          'ACTIVE',
          'Av. Independencia 1234, Mar del Plata',
          NULL
      ),
      (
          '28999888',
          'Carlos',
          'Martinez',
          'carlos.martinez@mail.com',
          '+5492231234567',
          '$2a$10$def456hash',
          '1985-09-20',
          'ACTIVE',
          'San Martín 4567, Mar del Plata',
          NULL
      ),
      (
          '31222333',
          'Lucia',
          'Fernandez',
          'lucia.fernandez@mail.com',
          '+5492239876543',
          '$2a$10$ghi789hash',
          '1992-01-30',
          'ACTIVE',
          'Colón 890, Mar del Plata',
          NULL
      );

INSERT INTO patient_caregiver (caregiver_id, patient_id)
VALUES
    (1,3),
    (2, 3),
    (1, 3),
    (2, 1),
    (3, 2),
    (1, 4),
    (2, 5);

INSERT INTO caregiver_report (
    patient_caregiver_id,
    report_date_start,
    report_date_end,
    report_content,
    observations,
    status,
    blood_pressure,
    temperature,
    pulse
) VALUES
      (
          7,
          '2026-02-01',
          '2026-02-01',
          'Administración de medicación matutina.',
          'Sin novedades relevantes.',
          'APPROVED',
          '120/80',
          '36.5',
          '72'
      ),
      (
          6,
          '2026-02-01',
          '2026-02-01',
          'Administración de medicación matutina.',
          'Sin novedades relevantes.',
          'PENDING',
          '120/80',
          '36.5',
          '72'
      ),

      (
          1,
          '2026-02-01',
          '2026-02-01',
          'Administración de medicación matutina.',
          'Sin novedades relevantes.',
          'PENDING',
          '120/80',
          '36.5',
          '72'
      ),
      (
          2,
          '2026-02-02',
          '2026-02-02',
          'Control general y asistencia en desayuno.',
          'Buena ingesta de líquidos.',
          'APPROVED',
          '118/79',
          '36.4',
          '70'
      ),
      (
          3,
          '2026-02-03',
          '2026-02-03',
          'Aseo personal y cambio de ropa.',
          'Paciente colaborador.',
          'REJECTED',
          '125/82',
          '36.7',
          '75'
      ),
      (
          4,
          '2026-02-04',
          '2026-02-04',
          'Control de presión y medicación nocturna.',
          'Leve dolor de cabeza reportado.',
          'PENDING',
          '130/85',
          '37.0',
          '80'
      ),
      (
          5,
          '2026-02-05',
          '2026-02-05',
          'Supervisión de almuerzo y caminata corta.',
          'Sin signos de fatiga.',
          'APPROVED',
          '119/78',
          '36.6',
          '71'
      );