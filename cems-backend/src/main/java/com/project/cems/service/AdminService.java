package com.project.cems.service;

import com.project.cems.dto.CoordinatorResponse;
import com.project.cems.dto.CreateCoordinatorRequest;

import java.util.List;

public interface AdminService {
    CoordinatorResponse createCoordinator(CreateCoordinatorRequest request);

    List<CoordinatorResponse> getAllCoordinators();

    void deleteCoordinator(Long coordinatorId);

    CoordinatorResponse updateCoordinator(Long id, CreateCoordinatorRequest request);
}
