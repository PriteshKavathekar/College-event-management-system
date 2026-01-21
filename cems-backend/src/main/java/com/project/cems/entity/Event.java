package com.project.cems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String department;
    private String eventDate;
    private String eventTime;
    private String venue;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
}
