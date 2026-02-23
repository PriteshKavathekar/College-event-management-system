package com.project.cems.service;

import com.project.cems.dto.RegisteredEventResponse;
import com.project.cems.dto.RegisteredStudentResponse;

import java.util.List;

public interface EventRegistrationService {

    void registerStudentToEvent(Long eventId, Long studentId);

    List<RegisteredStudentResponse> getStudentsByEvent(Long eventId);

    List<RegisteredEventResponse> getEventsByStudent(Long studentId);

    void deleteRegistration(Long eventId, Long studentId);
}
