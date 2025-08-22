package com.examly.springapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.service.InvitationCodeService;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class InvitationCodeController {
    @Autowired
    private InvitationCodeService service;

    @PostMapping("/generate-invitation-code")
    public ResponseEntity<?> generateInvitationCode() {
        String code = service.generateCode();
        return ResponseEntity.ok(Collections.singletonMap("code", code));
    }

    @PostMapping("/validate-invitation-code")
    public ResponseEntity<?> validateInvitationCode(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        boolean isValid = service.validateCode(code);
        return ResponseEntity.ok(Collections.singletonMap("valid", isValid));
    }
}
