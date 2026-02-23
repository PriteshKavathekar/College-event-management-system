package com.project.cems.service.impl;

import com.project.cems.dto.RegisteredEventResponse;
import com.project.cems.dto.RegisteredStudentResponse;
import com.project.cems.entity.Event;
import com.project.cems.entity.EventRegistration;
import com.project.cems.entity.Student;
import com.project.cems.repository.EventRegistrationRepository;
import com.project.cems.repository.EventRepository;
import com.project.cems.repository.StudentRepository;
import com.project.cems.service.EventRegistrationService;
import com.project.cems.service.EventService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventRegistrationServiceImpl implements EventRegistrationService {

    private final EventRegistrationRepository eventRegistrationRepository;
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;


    @Override
    public void registerStudentToEvent(Long eventId, Long studentId) {

        if(eventRegistrationRepository.existsByEventIdAndStudentId(eventId, studentId)){
            throw new RuntimeException("Student already registered for this event");
        }

        Event event = eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));

        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException(" Student not found"));

        EventRegistration registration = new EventRegistration();
        registration.setEvent(event);
        registration.setStudent(student);
        registration.setRegisteredAt(LocalDateTime.now());

        eventRegistrationRepository.save(registration);
    }

    @Override
    public List<RegisteredStudentResponse> getStudentsByEvent(Long eventId) {
        return eventRegistrationRepository.findByEventId(eventId)
                .stream()
                .map(eventRegistration -> modelMapper.map(
                        eventRegistration.getStudent(),
                        RegisteredStudentResponse.class
                )).toList();
    }

    @Override
    public List<RegisteredEventResponse> getEventsByStudent(Long studentId) {

        return eventRegistrationRepository.findByStudentId(studentId)
                .stream()
                .map(eventRegistration -> {
                    Event event = eventRegistration.getEvent();

                    RegisteredEventResponse res = new RegisteredEventResponse();
                    res.setId(event.getId());
                    res.setTitle(event.getTitle());
                    res.setDescription(event.getDescription());
                    res.setDepartment(event.getDepartment());
                    res.setEventDate(event.getEventDate());
                    res.setEventTime(event.getEventTime());
                    res.setVenue(event.getVenue());
                    res.setImage(event.getImage()); // ✅ IMAGE FIXED

                    return res;
                })
                .toList();
    }


    @Override
    public void deleteRegistration(Long eventId, Long studentId) {
        EventRegistration registration = eventRegistrationRepository.findByEventIdAndStudentId(eventId, studentId).orElseThrow(() -> new RuntimeException("Registration not found"));
        eventRegistrationRepository.delete(registration);
    }
}
