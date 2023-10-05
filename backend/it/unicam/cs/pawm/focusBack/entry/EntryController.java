package it.unicam.cs.pawm.focusBack.entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EntryController {

    @Autowired
    private EntryService entryService;

    //TODO just for the tests
    @PostMapping("/api/listOfEntries/{userId}")
    public ResponseEntity<List<Entry>> createEntries(@PathVariable Integer userId, @RequestBody List<Entry> entries){
        return this.entryService.createEntries(userId, entries);
    }

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
