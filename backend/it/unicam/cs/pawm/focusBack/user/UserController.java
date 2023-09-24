package it.unicam.cs.pawm.focusBack.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    //TODO: just for the tests
    @PostMapping("/api/users")
    public User createUser(User user){
        return this.userService.createUser(user);
    }

    //TODO: i need to associate a value to each temporal unit (hour-day, day-week, week-month, month-year) => i could use maps

}
