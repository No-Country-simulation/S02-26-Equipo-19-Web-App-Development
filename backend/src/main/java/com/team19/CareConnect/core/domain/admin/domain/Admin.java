package com.team19.CareConnect.core.domain.admin.domain;

import com.team19.CareConnect.core.domain.Role;
import com.team19.CareConnect.onboarding.domain.CaregiverRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Boolean isActive;
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Relación con CaregiverRequest
    @OneToMany(mappedBy = "reviewedBy")
    private List<CaregiverRequest> caregiverRequests = new ArrayList<>();
}