package com.examly.springapp;

import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.lang.reflect.Field;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // Test for getting all appointments
    @Test
    @Order(1)
    public void backend_testGetAllAppointments() throws Exception {
        mockMvc.perform(get("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    // Test for getting all feedbacks
    @Test
    @Order(2)
    public void backend_testGetAllFeedback() throws Exception {
        mockMvc.perform(get("/api/feedback")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$").isArray())
                .andReturn();
    }

    // Test to check @ManyToOne annotation in Feedback class
    @Test
    public void backend_testFeedbackHasManyToOneAnnotation() {
        try {
            Class<?> feedbackClass = Class.forName("com.examly.springapp.model.Feedback");
            Field[] declaredFields = feedbackClass.getDeclaredFields();

            boolean hasManyToOne = false;
            for (Field field : declaredFields) {
                if (field.isAnnotationPresent(ManyToOne.class)) {
                    hasManyToOne = true;
                    break;
                }
            }

            if (!hasManyToOne) {
                fail("No field with @ManyToOne annotation found in Feedback class.");
            }

        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }

    // Test to check @ManyToOne annotation in Pet class
    @Test
    public void backend_testPetHasManyToOneAnnotation() {
        try {
            Class<?> petClass = Class.forName("com.examly.springapp.model.Pet");
            Field[] declaredFields = petClass.getDeclaredFields();

            boolean hasManyToOne = false;
            for (Field field : declaredFields) {
                if (field.isAnnotationPresent(ManyToOne.class)) {
                    hasManyToOne = true;
                    break;
                }
            }

            if (!hasManyToOne) {
                fail("No field with @ManyToOne annotation found in Pet class.");
            }

        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }

    // Test to check interface and implementation for AppointmentService
    @Test
    public void backend_testAppointmentServiceInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.AppointmentService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.AppointmentServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    // Test to check interface and implementation for PetService
    @Test
    public void backend_testPetServiceInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.PetService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.PetServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    // Utility method to check if a class exists
    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    // Test if FeedbackController class exists
    @Test
    public void backend_testFeedbackControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.FeedbackController");
    }

    // Test if AppointmentController class exists
    @Test
    public void backend_testAppointmentControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.AppointmentController");
    }

    // Test if PetController class exists
    @Test
    public void backend_testPetControllerClassExists() {
        checkClassExists("com.examly.springapp.controller.PetController");
    }

    // Test if Feedback model class exists
    @Test
    public void backend_testFeedbackModelClassExists() {
        checkClassExists("com.examly.springapp.model.Feedback");
    }

    // Test if Appointment model class exists
    @Test
    public void backend_testAppointmentModelClassExists() {
        checkClassExists("com.examly.springapp.model.Appointment");
    }

    // Test if User model class exists
    @Test
    public void backend_testUserModelClassExists() {
        checkClassExists("com.examly.springapp.model.User");
    }

    // Test if Pet model class exists
    @Test
    public void backend_testPetModelClassExists() {
        checkClassExists("com.examly.springapp.model.Pet");
    }

    // Test if Feedback repository exists
    @Test
    public void backend_testFeedbackRepositoryExists() {
        checkClassExists("com.examly.springapp.repository.FeedbackRepo");
    }

    // Test if Appointment repository exists
    @Test
    public void backend_testAppointmentRepositoryExists() {
        checkClassExists("com.examly.springapp.repository.AppointmentRepo");
    }
}
