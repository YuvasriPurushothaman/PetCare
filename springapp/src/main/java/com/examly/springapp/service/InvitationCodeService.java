package com.examly.springapp.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.InvitationCode;
import com.examly.springapp.repository.InvitationCodeRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class InvitationCodeService {
    @Autowired
    private InvitationCodeRepository repository;

    public String generateCode() {
        String code = UUID.randomUUID().toString();
        InvitationCode invitationCode = new InvitationCode();
        invitationCode.setCode(code);
        invitationCode.setUsed(false);
        invitationCode.setExpirationDate(LocalDateTime.now().plusDays(7));
        repository.save(invitationCode);
        return code;
    }

    public boolean validateCode(String code) {
        Optional<InvitationCode> invitationCode = repository.findByCode(code);
        if (invitationCode.isPresent()) {
            InvitationCode codeEntity = invitationCode.get();
            if (!codeEntity.isUsed() && codeEntity.getExpirationDate().isAfter(LocalDateTime.now())) {
                // codeEntity.setUsed(true);
                repository.deleteById(codeEntity.getId());
                // repository.save(codeEntity);
                return true;
            }
        }
        return false;
    }
}
