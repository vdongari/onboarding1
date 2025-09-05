package com.zealthy.onboardingflow.validation;

import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

/**
 * Input validation utility for security
 */
@Component
public class InputValidator {
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    
    private static final Pattern ALPHANUMERIC_PATTERN = Pattern.compile("^[a-zA-Z0-9\\s]*$");
    private static final Pattern ZIP_PATTERN = Pattern.compile("^\\d{5}(-\\d{4})?$");
    
    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    public boolean isValidPassword(String password) {
        return password != null && password.length() >= 8 && password.length() <= 128;
    }
    
    public boolean isValidAlphanumeric(String input) {
        return input == null || ALPHANUMERIC_PATTERN.matcher(input).matches();
    }
    
    public boolean isValidZipCode(String zip) {
        return zip == null || ZIP_PATTERN.matcher(zip).matches();
    }
    
    public String sanitizeInput(String input) {
        if (input == null) return null;
        return input.trim().replaceAll("[<>\"'&]", "");
    }
}
