package com.project.cems.dto;

import lombok.Data;

@Data
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private String department;
    private String eventDate;
    private String eventTime;
    private String venue;
    private String image; //Base64
}
