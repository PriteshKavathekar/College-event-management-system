package com.project.cems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String studentPrn;
    private String department;
    private String year;
    private String gender;

    @Column(unique = true)
    private String email;
    private String mobile;
    private String password;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
}
