package com.project.cems.controller;

import com.project.cems.dto.RegisteredEventResponse;
import com.project.cems.dto.RegisteredStudentResponse;
import com.project.cems.service.EventRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/registrations")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EventRegistrationController {

    private final EventRegistrationService eventRegistrationService;

    //student registers to event
    @PostMapping("/event/{eventId}/student/{studentId}")
    @ResponseStatus(HttpStatus.OK)
    public String register(@PathVariable Long eventId, @PathVariable Long studentId){
        eventRegistrationService.registerStudentToEvent(eventId, studentId);
        return "Student registered to event";
    }

    //Coordinator views students of event
    @GetMapping("/event/{eventId}/students")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisteredStudentResponse> getStudents(@PathVariable Long eventId){
        return eventRegistrationService.getStudentsByEvent(eventId);
    }

    //student views registered events
    @GetMapping("/student/{studentId}/events")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisteredEventResponse> getEvents(@PathVariable Long studentId){
        return eventRegistrationService.getEventsByStudent(studentId);
    }

    //remove registration of a student from an event
    @DeleteMapping("/event/{eventId}/student/{studentId}")
    public String deleteRegistration(@PathVariable Long eventId, @PathVariable Long studentId){
        eventRegistrationService.deleteRegistration(eventId, studentId);
        return "Student removed from event";
    }
}
