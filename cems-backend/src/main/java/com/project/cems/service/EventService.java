package com.project.cems.service;

import com.project.cems.dto.EventRequest;
import com.project.cems.dto.EventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EventService {
    EventResponse createEvent(EventRequest request, MultipartFile image);

    List<EventResponse> getAllEvents();

    EventResponse updateEvent(Long id, EventRequest request, MultipartFile image);

    void deleteEvent(Long id);
}
