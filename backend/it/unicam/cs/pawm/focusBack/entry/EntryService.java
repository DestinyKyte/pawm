package it.unicam.cs.pawm.focusBack.entry;

import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EntryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntryRepository entryRepository;

    // TODO: just for the tests
    public ResponseEntity<List<Entry>> createEntries(Integer userId, List<Entry> entries) {
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findById(userId).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
        for(Entry e : entries){
            userToUpdate.getEntries().add(e);
        }
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    //TODO: just for the tests
    public Iterable<Entry> getAllEntries() {
        return this.entryRepository.findAll();
    }

    public ResponseEntity<Entry> createEntry(Integer userId, Entry entry){
        User userToUpdate;
        try{
            userToUpdate = this.userRepository.findById(userId).orElseThrow();
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(new Entry(), HttpStatus.NOT_FOUND);
        }

        Calendar calendar = Calendar.getInstance();
        entry.setYear(calendar.get(Calendar.YEAR));
        entry.setDayOfTheYear(calendar.get(Calendar.DAY_OF_YEAR));
        entry.setHourOfTheDay(calendar.get(Calendar.HOUR_OF_DAY));
        entry.setWeekOfTheYear(calendar.get(Calendar.WEEK_OF_YEAR));
        entry.setDayOfTheWeek(calendar.get(Calendar.DAY_OF_WEEK));
        entry.setMonth(calendar.get(Calendar.MONTH));

        userToUpdate.getEntries().add(entry);
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(entry, HttpStatus.OK);
    }
}
