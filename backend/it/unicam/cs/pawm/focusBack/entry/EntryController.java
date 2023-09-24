package it.unicam.cs.pawm.focusBack.entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class EntryController {

    @Autowired
    private EntryService entryService;

    //TODO: just for the tests
    @GetMapping("/api/entries")
    public Iterable<Entry> getAllEntries(){
        return this.entryService.getAllEntries();
    }

    @PostMapping("/api/entries/{userId}")
    public ResponseEntity<Entry> createEntry(@PathVariable Integer userId, @RequestBody Entry entry){
        return this.entryService.createEntry(userId, entry);
    }
}
