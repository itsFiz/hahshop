package com.ecommerce.main.Controller;

import com.ecommerce.main.dto.Resp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UploadFileController {
    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file ) {
        String fileName = file.getOriginalFilename();
        try {
            file.transferTo( new File("C:\\Users\\ACER\\Desktop\\FIZ\\UOB Training\\uob-ecommerce\\back-end\\src\\main\\resources\\static\\images\\" + fileName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(new Resp(200, "Success"));
    }

}
