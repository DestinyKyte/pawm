package it.unicam.cs.pawm.focusBack.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    //TODO in queste chiamate devo prendere in input l'id dell'utente

    @GetMapping("api/dashboard/dataOfDay/{typeOfData}/{year}/{dayOfTheYear}")
    public Integer[] getDataOfDay(@PathVariable String typeOfData, @PathVariable Integer year, @PathVariable Integer dayOfTheYear){
        return this.dashboardService.getDataOfDay(typeOfData, year, dayOfTheYear);
    }

    @GetMapping("api/dashboard/dataOfWeek/{typeOfData}/{year}/{weekOfTheYear}")
    public Integer[] getDataOfWeek(@PathVariable String typeOfData, @PathVariable Integer year, @PathVariable Integer weekOfTheYear){
        return this.dashboardService.getDataOfWeek(typeOfData, year, weekOfTheYear);
    }

    @GetMapping("api/dashboard/dataOfYear/{typeOfData}/{year}")
    public Integer[] getDataOfYear(@PathVariable String typeOfData, @PathVariable Integer year){
        return this.dashboardService.getDataOfYear(typeOfData, year);
    }
}
