package com.project.cems.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.cems.dto.EventRequest;
import com.project.cems.dto.EventResponse;
import com.project.cems.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/events")
@CrossOrigin("*")
public class EventController {

    private final EventService eventService;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponse createEvent(@RequestPart("event") String eventJson,
                                     @RequestPart(value = "image", required = false) MultipartFile image){

        try {
            EventRequest request = objectMapper.readValue(eventJson, EventRequest.class);
            return eventService.createEvent(request, image);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<EventResponse> getAllEvents(){
        return eventService.getAllEvents();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public EventResponse updateEvent(@PathVariable Long id,
                                     @RequestPart("event") String eventJson,
                                     @RequestPart(value = "image", required = false) MultipartFile image){
        try {
            EventRequest request = objectMapper.readValue(eventJson, EventRequest.class);
            return eventService.updateEvent(id, request, image);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
        return "Event deleted successfully";
    }
}
