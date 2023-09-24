package it.unicam.cs.pawm.focusBack.entry;

import it.unicam.cs.pawm.focusBack.Distraction;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private Integer timerId;

    private Float percentageOfCompletedTasks;

    private Integer qualityOfFocus;

    private List<Distraction> distractions;

    //TODO
    // you can extract information about the timestamp of the entry with timeCoordinate.get(Calendar.FIELD)
    // FIELD must be substituted with an actual field, like: YEAR, MONTH...
    private Calendar timestamp;
}
