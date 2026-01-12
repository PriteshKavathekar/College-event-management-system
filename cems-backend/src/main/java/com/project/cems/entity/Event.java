package com.project.cems.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private String department;
    private String date;
    private String venue;
    private String imagePath;
}
