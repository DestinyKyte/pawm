package it.unicam.cs.pawm.focusBack.entry;

import it.unicam.cs.pawm.focusBack.user.User;
import it.unicam.cs.pawm.focusBack.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class EntryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntryRepository entryRepository;

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
        userToUpdate.getEntries().add(entry);
        this.userRepository.save(userToUpdate);
        return new ResponseEntity<>(entry, HttpStatus.OK);
    }
}
