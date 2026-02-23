package com.project.cems.service.impl;

import com.project.cems.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendBulkEmail(
            List<String> toEmails,
            String subject,
            String message,
            String replyTo
    ) {
        for (String to : toEmails) {
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper =
                        new MimeMessageHelper(mimeMessage, false, "UTF-8");

                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText(message, false);

                // SYSTEM EMAIL (SMTP AUTH)
                helper.setFrom("college.cems@gmail.com");

                // ✅ REPLY GOES TO COORDINATOR
                helper.setReplyTo(replyTo);

                mailSender.send(mimeMessage);

            } catch (Exception e) {
                throw new RuntimeException("Failed to send email to " + to, e);
            }
        }
    }
}
