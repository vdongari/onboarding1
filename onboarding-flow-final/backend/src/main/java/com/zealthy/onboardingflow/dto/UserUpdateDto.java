package com.zealthy.onboardingflow.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserUpdateDto {
    @JsonProperty("about_me")
    private String aboutMe;
    
    @JsonProperty("street_address")
    private String streetAddress;
    
    private String city;
    private String state;
    private String zip;
    private String birthdate;
    
    @JsonProperty("current_step")
    private Integer currentStep;

    public UserUpdateDto() {}

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public Integer getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(Integer currentStep) {
        this.currentStep = currentStep;
    }
}
