package com.example.demo.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Cities;
import com.example.demo.model.City;
import com.example.demo.service.CityService;

@RestController
@RequestMapping("/test")
public class TestController {
	
	@Autowired
    private CityService cityService;
	
	@GetMapping
	public String test() {
		return "test";
	}

    @GetMapping(value="/cities.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public Cities findCitiesXml() {

        return cityService.findAll();
    }
    
    @GetMapping("/cities.json")
    public Cities findCitiesJson() {

        return cityService.findAll();
    }

    @GetMapping(value="/cities/{cityId}", produces=MediaType.APPLICATION_XML_VALUE)
    public City findCity(@PathVariable Long cityId) {
        return cityService.findById(cityId);
    }

}
