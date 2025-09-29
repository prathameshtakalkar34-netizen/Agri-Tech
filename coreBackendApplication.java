// CropAnalysisController.java
package com.example.cropbackend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Controller;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/analyze")
public class CropAnalysisController {

    @PostMapping
    public ResponseEntity<Map<String,Object>> analyze(@RequestParam("photo") MultipartFile photo) {
        try {
            File uploadsDir = new File("uploads");
            uploadsDir.mkdirs();

            File savedFile = new File(uploadsDir, photo.getOriginalFilename());
            photo.transferTo(savedFile);

            BufferedImage img = ImageIO.read(savedFile);
            int width = img.getWidth();
            int height = img.getHeight();
            long totalPixels = width * height;

            long r=0,g=0,b=0;

            for(int y=0;y<height;y++){
                for(int x=0;x<width;x++){
                    int pixel = img.getRGB(x,y);
                    r += (pixel >> 16) & 0xff;
                    g += (pixel >> 8) & 0xff;
                    b += pixel & 0xff;
                }
            }

            double green_pct = (g/(255.0*totalPixels))*100;
            double red_pct = (r/(255.0*totalPixels))*100;
            double blue_pct = (b/(255.0*totalPixels))*100;
            double greenness_score = green_pct / (green_pct+red_pct+blue_pct) * 100;
            String suggestion = greenness_score > 50 ? "Healthy crop" : "Needs attention";

            Map<String,Object> result = new HashMap<>();
            result.put("filename", photo.getOriginalFilename());
            result.put("green_pct", String.format("%.2f",green_pct));
            result.put("red_pct", String.format("%.2f",red_pct));
            result.put("blue_pct", String.format("%.2f",blue_pct));
            result.put("greenness_score", String.format("%.2f",greenness_score));
            result.put("suggestion", suggestion);

            return ResponseEntity.ok(result);

        } catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
