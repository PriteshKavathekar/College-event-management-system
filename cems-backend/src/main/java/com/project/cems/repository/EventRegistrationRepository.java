package com.project.cems.repository;

import com.project.cems.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventId(Long eventId);

    List<EventRegistration> findByStudentId(Long studentId);

    boolean existsByEventIdAndStudentId(Long eventId, Long studentId);

}
