package pt.jorgeduarte.testapp.controllers;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static java.lang.Thread.sleep;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8081")
public class RestApiController {
    @GetMapping("/data")
    public ResponseEntity<String> getData() {
        try {
            Thread.sleep(5000); // Simula um processamento que demora 5 segundos
            return ResponseEntity.ok("Dados recebidos via REST API");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro durante o processamento");
        }
    }


}
