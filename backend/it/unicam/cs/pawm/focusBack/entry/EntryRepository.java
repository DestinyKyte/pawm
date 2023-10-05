package it.unicam.cs.pawm.focusBack.entry;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EntryRepository extends CrudRepository<Entry, Integer> {

    @Query("FROM Entry WHERE year = ?1 AND dayOfTheYear = ?2 AND hourOfTheDay = ?3")
    List<Entry> findDataForChart1(Integer year, Integer dayOfTheYear, Integer hourOfTheDay);

    @Query("FROM Entry WHERE year = ?1 AND weekOfTheYear = ?2 AND dayOfTheWeek = ?3")
    List<Entry> findDataForChart2(Integer year, Integer weekOfTheYear, Integer dayOfTheWeek);

    @Query("FROM Entry WHERE year = ?1 AND month = ?2")
    List<Entry> findDataForChart3(Integer year, Integer month);
}
