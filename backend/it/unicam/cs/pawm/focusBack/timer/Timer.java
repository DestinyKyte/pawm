package it.unicam.cs.pawm.focusBack.timer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Timer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private Boolean isFocusTimer;

    private Calendar minutes;

    //TODO
    // optionally, add ringtone field
}
