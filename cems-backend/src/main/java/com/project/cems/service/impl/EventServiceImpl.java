package com.project.cems.service.impl;

import com.project.cems.dto.EventRequest;
import com.project.cems.dto.EventResponse;
import com.project.cems.entity.Event;
import com.project.cems.repository.EventRepository;
import com.project.cems.service.EventService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final ModelMapper modelMapper;

    @Override
    public EventResponse createEvent(EventRequest request, MultipartFile image) {
        Event event = modelMapper.map(request, Event.class);

        validateImage(image);

        try {
            if (image != null && !image.isEmpty()) {
                event.setImage(image.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("Event image upload failed");
        }

        Event savedEvent = eventRepository.save(event);
        return toResponse(savedEvent);
    }

    @Override
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream().map(this::toResponse).toList();
    }
    @Override
    public EventResponse updateEvent(Long id,
                                     EventRequest request,
                                     MultipartFile image) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));

        // update fields
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDepartment(request.getDepartment());
        event.setVenue(request.getVenue());
        event.setEventDate(request.getEventDate());
        event.setEventTime(request.getEventTime());

        validateImage(image);

        try {
            if (image != null && !image.isEmpty()) {
                event.setImage(image.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("Event image update failed");
        }

        Event updated = eventRepository.save(event);
        return toResponse(updated);
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // helper
    private EventResponse toResponse(Event event) {
        EventResponse res = modelMapper.map(event, EventResponse.class);

        if (event.getImage() != null) {
            res.setImage(
                    Base64.getEncoder().encodeToString(event.getImage())
            );
        }
        return res;
    }

    // validate image
    private void validateImage(MultipartFile image) {
        if (image == null || image.isEmpty()) return;

        String contentType = image.getContentType();

        if (contentType == null ||
                !(contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/jpg"))) {

            throw new RuntimeException("Only image files (JPG, JPEG, PNG) are allowed");
        }
    }
}
