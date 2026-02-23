package com.project.cems.controller;

import com.project.cems.dto.EmailRequest;
import com.project.cems.entity.Event;
import com.project.cems.entity.Student;
import com.project.cems.repository.EventRegistrationRepository;
import com.project.cems.repository.EventRepository;
import com.project.cems.repository.StudentRepository;
import com.project.cems.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;

    @PostMapping("/events/{eventId}/registered")
    public String notifyRegisteredStudents(
            @PathVariable Long eventId,
            @RequestBody EmailRequest request,
            @RequestHeader("X-User-Email") String coordinatorEmail
    ) {

        if (coordinatorEmail == null || coordinatorEmail.isBlank()) {
            throw new RuntimeException("Coordinator email missing");
        }

        eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<String> emails = registrationRepository
                .findByEventId(eventId)
                .stream()
                .map(r -> r.getStudent().getEmail())
                .toList();

        if (emails.isEmpty()) {
            return "No registered students found";
        }

        emailService.sendBulkEmail(
                emails,
                request.getSubject(),
                request.getMessage(),
                coordinatorEmail // dynamic
        );

        return "Emails sent to registered students";
    }

    @PostMapping("/events/{eventId}/all")
    public String notifyAllStudents(
            @PathVariable Long eventId,
            @RequestBody EmailRequest request,
            @RequestHeader("X-User-Email") String coordinatorEmail
    ) {

        if (coordinatorEmail == null || coordinatorEmail.isBlank()) {
            throw new RuntimeException("Coordinator email missing");
        }

        eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        List<String> emails = studentRepository.findAll()
                .stream()
                .map(Student::getEmail)
                .toList();

        if (emails.isEmpty()) {
            return "No students found";
        }

        emailService.sendBulkEmail(
                emails,
                request.getSubject(),
                request.getMessage(),
                coordinatorEmail // ✅ dynamic
        );

        return "Notification sent to all students";
    }


    @PostMapping("/student/{studentId}")
    public String notifySingleStudent(
            @PathVariable Long studentId,
            @RequestBody EmailRequest request,
            @RequestHeader("X-User-Email") String coordinatorEmail
    ) {

        if (coordinatorEmail == null || coordinatorEmail.isBlank()) {
            throw new RuntimeException("Coordinator email missing");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        emailService.sendBulkEmail(
                List.of(student.getEmail()),
                request.getSubject(),
                request.getMessage(),
                coordinatorEmail // ✅ dynamic
        );

        System.out.println("Reply-To Email = " + coordinatorEmail);

        return "Email sent to student";
    }

}
