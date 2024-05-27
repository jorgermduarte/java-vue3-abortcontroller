package pt.jorgeduarte.testapp.controllers;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@RestController
@RequestMapping("/stream")
@CrossOrigin(origins = "http://localhost:8081")
public class StreamController {
    @GetMapping(value = "/data", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<String> streamData() {
            return Flux.interval(Duration.ofSeconds(1))
                    .take(5)
                    .map( sequence -> "Stream" + sequence + " ")
                    .onErrorResume(ex -> Flux.just("Something went wrong: " + ex.getMessage()));
    }
}
