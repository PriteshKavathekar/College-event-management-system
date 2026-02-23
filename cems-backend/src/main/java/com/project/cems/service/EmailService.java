package com.project.cems.service;

import java.util.List;

public interface EmailService {

    void sendBulkEmail(
            List<String> toEmails,
            String subject,
            String message,
            String replyTo
    );
}
