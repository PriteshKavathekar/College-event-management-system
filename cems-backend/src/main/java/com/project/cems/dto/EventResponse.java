package com.project.cems.dto;

import lombok.Data;

@Data
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private String department;
    private String date;
    private String venue;
    private String imagePath;
}
