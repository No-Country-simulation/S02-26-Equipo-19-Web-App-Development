package com.team19.CareConnect.core.domain.patient.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team19.CareConnect.core.domain.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class Guardian {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guardian_id")
    private Long id;
    private String guardianDni;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate birthDate;
    private String password;
    private String phoneNumber;
    private String address;
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private GuardianStatus guardianStatus;
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "guardian")
    @JsonManagedReference
    private List<Patient> patients;
}
